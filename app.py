"""
Main Flask Application for ExHon Proctored Exam Platform
Provides monitoring dashboard with real-time updates via WebSocket
"""

from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import time
import threading
from datetime import datetime
import logging

# Import our custom modules
from monitor import get_monitor_instance
from killer import get_killer_instance, preview_termination

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'

# Initialize SocketIO for real-time updates
socketio = SocketIO(app, cors_allowed_origins="*", logger=True, engineio_logger=True)

# Global variables
monitor = get_monitor_instance()
killer = get_killer_instance()
monitoring_active = False
update_thread = None

@app.route('/')
def index():
    """Main dashboard page"""
    return render_template('dashboard.html')

@app.route('/api/system-info')
def get_system_info():
    """Get general system information"""
    try:
        system_info = monitor.get_system_info()
        return jsonify({
            'success': True,
            'data': system_info,
            'timestamp': time.time()
        })
    except Exception as e:
        logger.error(f"Error getting system info: {e}")
        return jsonify({
            'success': False,
            'error': str(e),
            'timestamp': time.time()
        }), 500

@app.route('/api/processes')
def get_processes():
    """Get all running processes"""
    try:
        processes = monitor.get_running_processes()
        ai_processes = monitor.get_ai_processes()

        return jsonify({
            'success': True,
            'data': {
                'all_processes': processes[:50],  # Limit to top 50 by memory
                'ai_processes': ai_processes,
                'total_count': len(processes),
                'ai_count': len(ai_processes)
            },
            'timestamp': time.time()
        })
    except Exception as e:
        logger.error(f"Error getting processes: {e}")
        return jsonify({
            'success': False,
            'error': str(e),
            'timestamp': time.time()
        }), 500

@app.route('/api/browser-tabs')
def get_browser_tabs():
    """Get all browser tabs"""
    try:
        tabs = monitor.get_browser_tabs()
        tab_summary = monitor.get_tab_summary()

        return jsonify({
            'success': True,
            'data': {
                'tabs': tabs,
                'summary': tab_summary
            },
            'timestamp': time.time()
        })
    except Exception as e:
        logger.error(f"Error getting browser tabs: {e}")
        return jsonify({
            'success': False,
            'error': str(e),
            'timestamp': time.time()
        }), 500

@app.route('/api/preview-termination')
def get_termination_preview():
    """Preview what would be terminated"""
    try:
        exam_url = request.args.get('exam_url', '')
        if exam_url:
            killer.set_exam_domain(exam_url)

        preview = preview_termination()

        return jsonify({
            'success': True,
            'data': preview,
            'timestamp': time.time()
        })
    except Exception as e:
        logger.error(f"Error getting termination preview: {e}")
        return jsonify({
            'success': False,
            'error': str(e),
            'timestamp': time.time()
        }), 500

@app.route('/api/kill-all', methods=['POST'])
def kill_all():
    """Kill all targeted AI applications and browser tabs"""
    try:
        data = request.get_json() or {}
        exam_url = data.get('exam_url', '')

        # Set the exam URL to protect
        if exam_url:
            killer.set_exam_domain(exam_url)

        # Perform the termination
        results = killer.kill_all_targeted(exam_url)

        # Emit real-time update to all connected clients
        socketio.emit('kill_completed', results)

        return jsonify({
            'success': True,
            'data': results,
            'timestamp': time.time()
        })

    except Exception as e:
        logger.error(f"Error during kill all: {e}")
        return jsonify({
            'success': False,
            'error': str(e),
            'timestamp': time.time()
        }), 500

@app.route('/api/kill-ai-only', methods=['POST'])
def kill_ai_only():
    """Kill only AI applications, preserve browser tabs"""
    try:
        results = killer.kill_ai_applications()

        # Emit real-time update
        socketio.emit('ai_kill_completed', results)

        return jsonify({
            'success': True,
            'data': results,
            'timestamp': time.time()
        })

    except Exception as e:
        logger.error(f"Error killing AI applications: {e}")
        return jsonify({
            'success': False,
            'error': str(e),
            'timestamp': time.time()
        }), 500

@app.route('/api/close-tabs-only', methods=['POST'])
def close_tabs_only():
    """Close browser tabs only, preserve AI applications"""
    try:
        data = request.get_json() or {}
        exam_url = data.get('exam_url', '')

        if exam_url:
            killer.set_exam_domain(exam_url)

        results = killer.close_browser_tabs(preserve_exam_tab=True)

        # Emit real-time update
        socketio.emit('tabs_closed', results)

        return jsonify({
            'success': True,
            'data': results,
            'timestamp': time.time()
        })

    except Exception as e:
        logger.error(f"Error closing browser tabs: {e}")
        return jsonify({
            'success': False,
            'error': str(e),
            'timestamp': time.time()
        }), 500

# WebSocket Events
@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    logger.info(f"Client connected: {request.sid}")
    emit('connected', {'data': 'Connected to ExHon monitoring server'})

    # Send initial data
    try:
        processes = monitor.get_running_processes()[:20]  # Top 20
        ai_processes = monitor.get_ai_processes()
        tabs = monitor.get_browser_tabs()
        system_info = monitor.get_system_info()

        emit('initial_data', {
            'processes': processes,
            'ai_processes': ai_processes,
            'browser_tabs': tabs,
            'system_info': system_info,
            'timestamp': time.time()
        })
    except Exception as e:
        logger.error(f"Error sending initial data: {e}")

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    logger.info(f"Client disconnected: {request.sid}")

@socketio.on('start_monitoring')
def handle_start_monitoring():
    """Start real-time monitoring"""
    global monitoring_active, update_thread

    if not monitoring_active:
        monitoring_active = True
        update_thread = threading.Thread(target=monitoring_loop, daemon=True)
        update_thread.start()
        emit('monitoring_started', {'status': 'Monitoring started'})
        logger.info("Real-time monitoring started")

@socketio.on('stop_monitoring')
def handle_stop_monitoring():
    """Stop real-time monitoring"""
    global monitoring_active
    monitoring_active = False
    emit('monitoring_stopped', {'status': 'Monitoring stopped'})
    logger.info("Real-time monitoring stopped")

@socketio.on('request_update')
def handle_request_update():
    """Handle manual update request"""
    try:
        data = get_current_monitoring_data()
        emit('monitoring_update', data)
    except Exception as e:
        logger.error(f"Error handling update request: {e}")
        emit('error', {'message': str(e)})

def monitoring_loop():
    """Background thread for real-time monitoring updates"""
    global monitoring_active

    while monitoring_active:
        try:
            data = get_current_monitoring_data()
            socketio.emit('monitoring_update', data)
            time.sleep(5)  # Update every 5 seconds
        except Exception as e:
            logger.error(f"Error in monitoring loop: {e}")
            time.sleep(10)  # Wait longer on error

def get_current_monitoring_data():
    """Get current monitoring data for real-time updates"""
    processes = monitor.get_running_processes()[:25]  # Top 25
    ai_processes = monitor.get_ai_processes()
    tabs = monitor.get_browser_tabs()
    tab_summary = monitor.get_tab_summary()

    # Basic system stats
    try:
        import psutil
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
    except ImportError:
        cpu_percent = 0
        memory = type('Memory', (), {'percent': 0, 'used': 0, 'total': 0})()

    return {
        'processes': {
            'all': processes,
            'ai': ai_processes,
            'count': len(processes)
        },
        'browser_tabs': {
            'tabs': tabs,
            'summary': tab_summary
        },
        'system_stats': {
            'cpu_percent': cpu_percent,
            'memory_percent': memory.percent,
            'memory_used_gb': round(memory.used / (1024**3), 2),
            'memory_total_gb': round(memory.total / (1024**3), 2)
        },
        'timestamp': time.time(),
        'datetime': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

# Error Handlers
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({
        'success': False,
        'error': 'Endpoint not found',
        'timestamp': time.time()
    }), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {error}")
    return jsonify({
        'success': False,
        'error': 'Internal server error',
        'timestamp': time.time()
    }), 500

@app.before_request
def log_request_info():
    """Log request information"""
    if request.path.startswith('/api/'):
        logger.info(f"API Request: {request.method} {request.path}")

if __name__ == '__main__':
    # Initialize browser debugging if possible
    try:
        monitor.start_browser_debugging()
        logger.info("Browser debugging protocols initialized")
    except Exception as e:
        logger.warning(f"Could not initialize browser debugging: {e}")

    # Run the application
    logger.info("Starting ExHon Proctored Exam Platform...")
    socketio.run(app, host='127.0.0.1', port=5000, debug=True, allow_unsafe_werkzeug=True)
