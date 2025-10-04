/**
 * ExamGuardian Pro - Ultra Premium Dashboard JavaScript
 * Advanced Dynamic Programming, Intelligent Caching, Premium Animations
 * Version: 3.0 - Ultra Premium Edition with Sophisticated Algorithms
 */

class ExamGuardianDashboard {
  constructor() {
    // Core System Properties
    this.socket = null;
    this.isConnected = false;
    this.monitoringActive = false;
    this.currentExamUrl = this.getCurrentUrl();
    this.updateInterval = null;
    this.animationFrameId = null;

    // Advanced Dynamic Programming Cache System
    this.dpCache = {
      processFilters: new LRUCache(100),
      tabGroupings: new LRUCache(50),
      threatAnalysis: new LRUCache(30),
      performanceData: new LRUCache(200),
      searchResults: new LRUCache(50),
      sortedData: new LRUCache(20),
    };

    // Intelligent State Management
    this.state = new StateManager({
      currentView: "dashboard",
      selectedProcess: null,
      selectedTab: null,
      filterMode: "all",
      sortBy: "memory",
      sortOrder: "desc",
      searchQuery: "",
      isLoading: false,
      lastAction: null,
      threatLevel: 0,
      performanceMetrics: {},
      animationQueue: [],
      connectionStatus: "connecting",
    });

    // Advanced Performance Monitoring
    this.performanceTracker = new PerformanceTracker({
      renderTimes: [],
      apiResponseTimes: [],
      memoryUsage: [],
      cpuUsage: [],
      cacheHitRate: 0,
      animationFrameRate: 60,
    });

    // Sophisticated Animation System
    this.animationEngine = new AnimationEngine({
      globalAnimationsEnabled: !this.isPrefersReducedMotion(),
      animationQueue: [],
      activeAnimations: new Map(),
      easingFunctions: this.createEasingFunctions(),
    });

    // Advanced Settings with Intelligent Defaults
    this.settings = new SettingsManager({
      updateInterval: 5,
      audioAlerts: true,
      autoTerminate: true,
      examDomain: this.getExamDomain(),
      notifications: true,
      darkMode: true,
      animationsEnabled: !this.isPrefersReducedMotion(),
      cacheEnabled: true,
      debugMode: false,
      performanceMode: "balanced",
      threatSensitivity: "medium",
      autoRefresh: true,
    });

    // UI Elements Management
    this.elements = this.initializeElements();
    this.eventListeners = new Map();
    this.boundHandlers = new Map();

    // Advanced Data Structures
    this.processTree = new ProcessTree();
    this.threatDetector = new ThreatDetector();
    this.dataProcessor = new DataProcessor();

    // Initialize Dashboard
    this.init();
  }

  /**
   * Advanced Initialization with Progressive Enhancement
   */
  async init() {
    try {
      this.showLoadingMessage("🛡️ Initializing ExamGuardian Pro...");

      // Progressive initialization steps
      const initSteps = [
        { step: "cache", message: "Initializing intelligent cache..." },
        { step: "charts", message: "Loading advanced visualizations..." },
        { step: "socket", message: "Establishing secure connection..." },
        { step: "events", message: "Binding event handlers..." },
        { step: "performance", message: "Starting performance monitoring..." },
        { step: "animations", message: "Preparing premium animations..." },
      ];

      for (const { step, message } of initSteps) {
        this.updateLoadingMessage(message);
        await this[
            `initialize${step.charAt(0).toUpperCase() + step.slice(1)}`
            ]();
        await this.delay(200); // Smooth progressive loading
      }

      // Load settings and start monitoring
      await this.loadSettings();
      this.startPeriodicUpdates();
      this.setupKeyboardShortcuts();
      this.initializeAudioSystem();

      // Premium entrance animations
      if (this.settings.animationsEnabled) {
        await this.orchestrateEntranceAnimations();
      }

      this.logActivity(
          "🚀 ExamGuardian Pro initialized successfully",
          "success",
      );
      this.hideLoading();
    } catch (error) {
      this.handleError(error, "Initialization failed");
    }
  }

  /**
   * Advanced Cache System with LRU Implementation
   */
  initializeCache() {
    if (!this.settings.cacheEnabled) return;

    // Set up intelligent cache cleanup
    this.cacheCleanupInterval = setInterval(() => {
      this.performIntelligentCacheCleanup();
    }, 300000); // 5 minutes

    // Precompute common operations
    this.precomputeCommonOperations();

    this.logActivity("🧠 Intelligent cache system initialized", "info");
  }

  /**
   * Advanced Chart System with Real-time Updates
   */
  async initializeCharts() {
    if (typeof Chart === "undefined") return;

    try {
      // System Health Chart with Advanced Configuration
      const healthCanvas = this.elements.health_chart;
      if (healthCanvas) {
        this.charts.health = new Chart(healthCanvas.getContext("2d"), {
          type: "doughnut",
          data: {
            datasets: [
              {
                data: [85, 15],
                backgroundColor: [
                  "rgba(56, 239, 125, 0.8)",
                  "rgba(255, 255, 255, 0.1)",
                ],
                borderWidth: 0,
                cutout: "70%",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
            animation: {
              animateRotate: true,
              duration: 2000,
              easing: "easeInOutQuart",
            },
          },
        });
      }

      // Performance Charts
      this.createPerformanceCharts();
      this.logActivity("📊 Advanced charts initialized", "info");
    } catch (error) {
      this.logActivity(
          "⚠️ Chart initialization failed: " + error.message,
          "warning",
      );
    }
  }

  /**
   * Advanced Socket.IO with Intelligent Reconnection
   */
  initializeSocket() {
    try {
      this.socket = io({
        transports: ["websocket", "polling"],
        upgrade: true,
        rememberUpgrade: true,
        timeout: 20000,
        forceNew: false,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        maxReconnectionAttempts: 10,
      });

      // Connection Management
      this.socket.on("connect", () => this.handleConnection(true));
      this.socket.on("disconnect", (reason) =>
          this.handleConnection(false, reason),
      );
      this.socket.on("reconnect", () => this.handleReconnection());
      this.socket.on("reconnect_failed", () => this.handleReconnectionFailed());

      // Data Events with Advanced Processing
      this.socket.on("initial_data", (data) => this.handleInitialData(data));
      this.socket.on("monitoring_update", (data) =>
          this.handleMonitoringUpdate(data),
      );
      this.socket.on("kill_completed", (data) =>
          this.handleKillCompleted(data),
      );
      this.socket.on("ai_kill_completed", (data) =>
          this.handleAiKillCompleted(data),
      );
      this.socket.on("tabs_closed", (data) => this.handleTabsClosed(data));
      this.socket.on("error", (data) => this.handleSocketError(data));

      this.logActivity(
          "🔌 Socket.IO initialized with advanced features",
          "info",
      );
    } catch (error) {
      this.handleError(error, "Socket initialization failed");
    }
  }

  /**
   * Ultra Premium Event Binding System
   */
  bindEvents() {
    // Primary Action Buttons with Advanced Handlers
    this.bindAdvancedButton("close-all-btn", () =>
        this.showConfirmationModal("kill-all"),
    );
    this.bindAdvancedButton("kill-ai-btn", () =>
        this.showConfirmationModal("kill-ai"),
    );
    this.bindAdvancedButton("kill-ai-quick", () =>
        this.showConfirmationModal("kill-ai"),
    );
    this.bindAdvancedButton("close-tabs-btn", () =>
        this.showConfirmationModal("close-tabs"),
    );
    this.bindAdvancedButton("close-tabs-quick", () =>
        this.showConfirmationModal("close-tabs"),
    );

    // Enhanced Refresh Buttons
    this.bindAdvancedButton("refresh-processes-btn", () =>
        this.refreshWithAnimation("processes"),
    );
    this.bindAdvancedButton("refresh-tabs-btn", () =>
        this.refreshWithAnimation("tabs"),
    );

    // Modal Actions
    this.bindAdvancedButton("confirm-action", () => this.executeAction());

    // Advanced Search with Debouncing and Intelligent Filtering
    this.bindIntelligentInput("process-search", (value) =>
        this.handleIntelligentSearch(value),
    );

    // Settings Management
    this.bindAdvancedButton("save-settings", () => this.saveSettings());

    // Log Management with Batch Operations
    this.bindAdvancedButton("clear-log", () =>
        this.clearActivityLogWithConfirmation(),
    );
    this.bindAdvancedButton("export-log", () =>
        this.exportActivityLogAdvanced(),
    );

    // Advanced Dropdown Actions
    this.bindAdvancedDropdownActions();

    // Global Event Listeners with Performance Optimization
    this.bindOptimizedGlobalEvents();

    this.logActivity("⚡ Advanced event system initialized", "info");
  }

  /**
   * Advanced Performance Monitoring System
   */
  initializePerformance() {
    // Real-time performance monitoring
    this.performanceMonitor = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.performanceTracker.addEntry(entry);
      }
    });

    if (PerformanceObserver.supportedEntryTypes.includes("measure")) {
      this.performanceMonitor.observe({
        entryTypes: ["measure", "navigation", "resource"],
      });
    }

    // Memory usage monitoring
    if ("memory" in performance) {
      this.memoryMonitorInterval = setInterval(() => {
        this.trackMemoryUsage();
      }, 30000); // Every 30 seconds
    }

    // Frame rate monitoring for animations
    this.startFrameRateMonitoring();

    this.logActivity("📈 Performance monitoring system active", "info");
  }

  /**
   * Premium Animation Engine
   */
  initializeAnimations() {
    // Initialize GSAP-like animation engine
    this.animationEngine.initialize();

    // Set up staggered entrance animations
    this.prepareEntranceAnimations();

    // Initialize micro-interactions
    this.initializeMicroInteractions();

    this.logActivity("✨ Premium animation engine loaded", "info");
  }

  /**
   * Advanced Data Processing with Memoization
   */
  async handleMonitoringUpdate(data) {
    const startTime = performance.now();

    try {
      // Smart data comparison to avoid unnecessary updates
      if (this.isDataUnchanged(data)) {
        return;
      }

      // Cache previous data for intelligent comparison
      const previousData = { ...this.state.get("lastUpdateData") };
      this.state.set("lastUpdateData", data);

      // Process updates with intelligent batching
      const updatePromises = [];

      if (
          data.processes &&
          this.hasSignificantChange(data.processes, previousData.processes)
      ) {
        updatePromises.push(
            this.updateProcessesDisplayAdvanced(
                data.processes,
                previousData.processes,
            ),
        );
      }

      if (
          data.browser_tabs &&
          this.hasSignificantChange(data.browser_tabs, previousData.browser_tabs)
      ) {
        updatePromises.push(
            this.updateBrowserTabsDisplayAdvanced(
                data.browser_tabs,
                previousData.browser_tabs,
            ),
        );
      }

      if (data.system_stats) {
        updatePromises.push(
            this.updateSystemStatsAdvanced(
                data.system_stats,
                previousData.system_stats,
            ),
        );
      }

      // Execute all updates concurrently
      await Promise.all(updatePromises);

      // Advanced threat analysis with ML-like detection
      this.analyzeThreatsAdvanced(data);

      // Update performance metrics
      this.updatePerformanceMetrics(data.system_stats);

      // Update timestamp with smooth animation
      if (data.datetime) {
        this.updateTimestampSmooth(data.datetime);
      }

      // Track performance
      this.performanceTracker.addRenderTime(performance.now() - startTime);
    } catch (error) {
      this.handleError(error, "Data processing failed");
    }
  }

  /**
   * Advanced Process Display with Virtual Scrolling
   */
  async updateProcessesDisplayAdvanced(processesData, previousData = {}) {
    const tbody = this.elements.processes_table;
    if (!tbody) return;

    const processes = processesData.all || [];
    const aiProcesses = processesData.ai || [];

    // Generate cache key for memoization
    const cacheKey = this.generateProcessCacheKey(
        processes,
        this.state.get("filterMode"),
        this.state.get("sortBy"),
    );

    // Check cache first
    let processedData = this.dpCache.processFilters.get(cacheKey);

    if (!processedData) {
      // Process data with advanced algorithms
      processedData = await this.processDataWithAdvancedDP(
          processes,
          aiProcesses,
      );
      this.dpCache.processFilters.set(cacheKey, processedData);
    }

    // Update counters with orchestrated animations
    await this.orchestrateCounterUpdates({
      total_processes: processedData.totalCount,
      ai_processes: processedData.aiCount,
      ai_count_badge: processedData.aiCount,
      threat_counter: processedData.aiCount,
      running_count: processedData.runningCount,
      memory_count_badge: processedData.highMemoryCount,
    });

    // Update status indicators with smooth transitions
    this.updateProcessStatusAdvanced(processedData);

    // Render table with virtual scrolling for performance
    this.renderProcessTableVirtual(processedData.displayProcesses);
  }

  /**
   * Advanced Data Processing with Machine Learning-like Algorithms
   */
  async processDataWithAdvancedDP(processes, aiProcesses) {
    // Multi-dimensional memoization cache
    const memoCache = new Map();

    // Advanced process categorization with weighted scoring
    const categorizeProcessAdvanced = (process) => {
      const key = `${process.name}-${process.memory_percent}-${process.cpu_percent}-${process.pid}`;

      if (memoCache.has(key)) {
        return memoCache.get(key);
      }

      const result = {
        ...process,
        category: this.calculateProcessCategory(process),
        threatScore: this.calculateThreatScore(process),
        priority: this.calculateProcessPriority(process),
        riskLevel: this.assessRiskLevel(process),
        recommendation: this.generateRecommendation(process),
      };

      memoCache.set(key, result);
      return result;
    };

    // Parallel processing for large datasets
    const categorizedProcesses = await this.processInBatches(
        processes,
        categorizeProcessAdvanced,
        50,
    );

    // Advanced analytics
    const analytics = this.calculateAdvancedAnalytics(categorizedProcesses);

    return {
      allProcesses: categorizedProcesses,
      displayProcesses:
          this.applyIntelligentFiltersAndSort(categorizedProcesses),
      totalCount: processes.length,
      aiCount: aiProcesses.length,
      runningCount: processes.filter((p) => p.status === "running").length,
      highMemoryCount: processes.filter((p) => p.memory_percent > 10).length,
      categories: this.groupByAdvancedCategories(categorizedProcesses),
      analytics,
      timestamp: Date.now(),
    };
  }

  /**
   * Advanced Threat Analysis with Intelligent Detection
   */
  analyzeThreatsAdvanced(data) {
    const threats = this.identifyThreatsAdvanced(data);
    const threatScore = this.calculateThreatScore(threats);

    // Check for significant threat level changes
    const previousThreatLevel = this.state.get("threatLevel");
    if (Math.abs(threatScore - previousThreatLevel) > 0.5) {
      this.handleThreatLevelChangeAdvanced(threatScore, threats);
      this.state.set("threatLevel", threatScore);
    }

    // Intelligent auto-termination with safety checks
    if (this.settings.autoTerminate && threats.aiApps.length > 0) {
      this.evaluateAutoTermination(threats);
    }

    // Update threat visualization
    this.updateThreatVisualization(threats);
  }

  /**
   * Advanced Animation Orchestration
   */
  async orchestrateCounterUpdates(updates) {
    const animations = Object.entries(updates)
        .map(([elementId, value]) => {
          const element = this.elements[elementId];
          if (element) {
            return this.animateCounterAdvanced(element, value);
          }
        })
        .filter(Boolean);

    // Stagger animations for premium feel
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => animations[i], i * 100);
    }
  }

  /**
   * Advanced Counter Animation with Physics
   */
  async animateCounterAdvanced(element, newValue, options = {}) {
    if (!element || !this.settings.animationsEnabled) {
      if (element) element.textContent = newValue;
      return;
    }

    const {
      duration = 800,
      easing = "easeOutQuart",
      onUpdate = null,
      onComplete = null,
    } = options;

    const currentValue = parseInt(element.textContent) || 0;
    if (currentValue === newValue) return;

    return new Promise((resolve) => {
      const startTime = performance.now();
      const startValue = currentValue;
      const difference = newValue - startValue;

      const animate = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Apply advanced easing
        const eased = this.animationEngine.applyEasing(progress, easing);
        const current = Math.round(startValue + difference * eased);

        element.textContent = current;

        // Custom update callback
        if (onUpdate) onUpdate(current, progress);

        if (progress < 1) {
          this.animationFrameId = requestAnimationFrame(animate);
        } else {
          element.textContent = newValue;

          // Add completion effects
          if (Math.abs(difference) > 0) {
            this.addCounterCompletionEffect(element);
          }

          if (onComplete) onComplete();
          resolve();
        }
      };

      this.animationFrameId = requestAnimationFrame(animate);
    });
  }

  /**
   * Advanced Action Execution with Error Recovery
   */
  async executeAction() {
    if (!this.pendingAction) return;

    const actionMap = {
      "kill-all": () => this.performKillAllAdvanced(),
      "kill-ai": () => this.performKillAIAdvanced(),
      "close-tabs": () => this.performCloseTabsAdvanced(),
    };

    this.showLoadingAdvanced(`Executing ${this.pendingAction} action...`);
    this.elements.confirmModal?.hide();

    try {
      const action = actionMap[this.pendingAction];
      if (action) {
        await action();
        this.playSuccessSound();
      }
    } catch (error) {
      this.handleError(error, "Action execution failed");
      this.showAlert("Action failed: " + error.message, "danger");
      this.playErrorSound();
    } finally {
      this.hideLoadingAdvanced();
      this.pendingAction = null;
    }
  }

  /**
   * Advanced API Communication with Retry Logic
   */
  async apiCall(endpoint, options = {}) {
    const startTime = performance.now();
    const maxRetries = 3;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          timeout: 15000,
          ...options,
        };

        if (config.body) {
          config.body = JSON.stringify(config.body);
        }

        const response = await fetch(endpoint, config);
        const data = await response.json();

        // Track API performance
        const responseTime = performance.now() - startTime;
        this.performanceTracker.addApiResponseTime(responseTime);

        if (!response.ok) {
          throw new Error(data.error || `HTTP ${response.status}`);
        }

        return data;
      } catch (error) {
        lastError = error;

        if (attempt < maxRetries) {
          // Exponential backoff
          await this.delay(Math.pow(2, attempt) * 1000);
          this.logActivity(
              `🔄 Retrying API call (${attempt}/${maxRetries})`,
              "warning",
          );
        }
      }
    }

    this.logActivity(
        `🌐 API Error [${endpoint}]: ${lastError.message}`,
        "error",
    );
    throw lastError;
  }

  /**
   * Advanced Error Handling with Recovery Strategies
   */
  handleError(error, context = "Unknown") {
    console.error(`ExamGuardian Error [${context}]:`, error);

    // Log error with context
    this.logActivity(`❌ ${context}: ${error.message}`, "error");

    // Advanced error recovery strategies
    if (error.name === "NetworkError") {
      this.handleNetworkError(error);
    } else if (error.name === "TypeError") {
      this.handleTypeError(error);
    } else {
      this.handleGenericError(error);
    }

    // Update UI state
    this.hideLoadingAdvanced();
    this.updateConnectionStatus(false);

    // Attempt automatic recovery
    this.attemptAutomaticRecovery(error, context);
  }

  /**
   * Intelligent Search with Fuzzy Matching
   */
  handleIntelligentSearch(query) {
    const cacheKey = `search_${query.toLowerCase().trim()}`;

    // Check cache first
    let results = this.dpCache.searchResults.get(cacheKey);

    if (!results) {
      // Perform intelligent search with fuzzy matching
      results = this.performFuzzySearch(query);
      this.dpCache.searchResults.set(cacheKey, results);
    }

    // Apply search results with smooth animations
    this.applySearchResultsAnimated(results);

    // Update search analytics
    this.updateSearchAnalytics(query, results.length);
  }

  /**
   * Advanced Performance Tracking
   */
  trackMemoryUsage() {
    if ("memory" in performance) {
      const memory = performance.memory;
      const usage = {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        timestamp: Date.now(),
      };

      this.performanceTracker.addMemoryReading(usage);

      // Trigger garbage collection warning if memory usage is high
      if (usage.used / usage.limit > 0.8) {
        this.logActivity("⚠️ High memory usage detected", "warning");
        this.optimizeMemoryUsage();
      }
    }
  }

  /**
   * Intelligent Cache Cleanup with LRU Algorithm
   */
  performIntelligentCacheCleanup() {
    const maxAge = 600000; // 10 minutes
    const now = Date.now();
    let cleanedCount = 0;

    // Cleanup all cache instances
    Object.values(this.dpCache).forEach((cache) => {
      if (cache instanceof LRUCache) {
        cleanedCount += cache.cleanup(maxAge);
      }
    });

    if (cleanedCount > 0) {
      this.logActivity(`🧹 Cleaned ${cleanedCount} cache entries`, "info");
    }

    // Update cache hit rate
    this.updateCacheHitRate();
  }

  /**
   * Advanced Audio System with Spatial Audio
   */
  initializeAudioSystem() {
    try {
      // Create audio context for advanced audio features
      this.audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();
      this.audioBuffers = new Map();

      // Load audio samples
      this.loadAudioSamples([
        { name: "success", url: "/static/audio/success.wav" },
        { name: "error", url: "/static/audio/error.wav" },
        { name: "warning", url: "/static/audio/warning.wav" },
        { name: "notification", url: "/static/audio/notification.wav" },
      ]);

      this.logActivity("🔊 Advanced audio system initialized", "info");
    } catch (error) {
      this.logActivity("⚠️ Audio system unavailable", "warning");
    }
  }

  /**
   * Utility Functions
   */

  getCurrentUrl() {
    return window.location.href;
  }

  getExamDomain() {
    try {
      return new URL(window.location.href).hostname;
    } catch {
      return "localhost";
    }
  }

  isPrefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  generateProcessCacheKey(processes, filterMode, sortBy) {
    const hash = this.simpleHash(
        JSON.stringify({
          count: processes.length,
          filter: filterMode,
          sort: sortBy,
          timestamp: Math.floor(Date.now() / 30000), // 30-second buckets
        }),
    );
    return `process_${hash}`;
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  formatBytes(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  formatUptime(seconds) {
    const units = [
      { name: "d", value: 86400 },
      { name: "h", value: 3600 },
      { name: "m", value: 60 },
      { name: "s", value: 1 },
    ];

    let result = "";
    let remaining = seconds;

    for (const unit of units) {
      const count = Math.floor(remaining / unit.value);
      if (count > 0) {
        result += `${count}${unit.name} `;
        remaining %= unit.value;
      }
    }

    return result.trim() || "0s";
  }

  /**
   * Cleanup and Destruction
   */
  destroy() {
    // Clear all intervals and timeouts
    if (this.updateInterval) clearInterval(this.updateInterval);
    if (this.cacheCleanupInterval) clearInterval(this.cacheCleanupInterval);
    if (this.memoryMonitorInterval) clearInterval(this.memoryMonitorInterval);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

    // Disconnect socket
    if (this.socket) {
      this.socket.disconnect();
    }

    // Clean up performance monitoring
    if (this.performanceMonitor) {
      this.performanceMonitor.disconnect();
    }

    // Close audio context
    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close();
    }

    // Remove all event listeners
    this.boundHandlers.forEach((handler, event) => {
      document.removeEventListener(event, handler);
    });

    // Clear all caches
    Object.values(this.dpCache).forEach((cache) => {
      if (cache.clear) cache.clear();
    });

    this.logActivity("🏁 ExamGuardian Pro shutdown complete", "info");
  }
}

/**
 * Advanced Supporting Classes
 */

// LRU Cache Implementation
class LRUCache {
  constructor(maxSize = 100) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      // Move to end (most recently used)
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value.data;
    }
    return null;
  }

  set(key, data) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  cleanup(maxAge) {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > maxAge) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    return cleaned;
  }

  clear() {
    this.cache.clear();
  }

  get size() {
    return this.cache.size;
  }
}

// State Manager
class StateManager {
  constructor(initialState = {}) {
    this.state = { ...initialState };
    this.listeners = new Map();
    this.history = [];
    this.maxHistory = 50;
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    const oldValue = this.state[key];
    this.state[key] = value;

    // Add to history
    this.history.push({
      key,
      oldValue,
      newValue: value,
      timestamp: Date.now(),
    });

    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    // Notify listeners
    if (this.listeners.has(key)) {
      this.listeners.get(key).forEach((listener) => listener(value, oldValue));
    }
  }

  subscribe(key, listener) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key).add(listener);

    return () => {
      this.listeners.get(key).delete(listener);
    };
  }

  getHistory(key, limit = 10) {
    return this.history.filter((entry) => entry.key === key).slice(-limit);
  }
}

// Performance Tracker
class PerformanceTracker {
  constructor(options = {}) {
    this.renderTimes = [];
    this.apiResponseTimes = [];
    this.memoryReadings = [];
    this.cacheHitRate = 0;
    this.animationFrameRate = 60;
    this.maxEntries = options.maxEntries || 100;
  }

  addRenderTime(time) {
    this.renderTimes.push({
      value: time,
      timestamp: Date.now(),
    });
    this.trimArray(this.renderTimes);
  }

  addApiResponseTime(time) {
    this.apiResponseTimes.push({
      value: time,
      timestamp: Date.now(),
    });
    this.trimArray(this.apiResponseTimes);
  }

  addMemoryReading(reading) {
    this.memoryReadings.push(reading);
    this.trimArray(this.memoryReadings);
  }

  addEntry(entry) {
    // Handle PerformanceObserver entries
    if (entry.entryType === "measure") {
      this.addRenderTime(entry.duration);
    }
  }

  trimArray(arr) {
    while (arr.length > this.maxEntries) {
      arr.shift();
    }
  }

  getAverageRenderTime() {
    if (this.renderTimes.length === 0) return 0;
    const sum = this.renderTimes.reduce((acc, entry) => acc + entry.value, 0);
    return sum / this.renderTimes.length;
  }

  getAverageApiResponseTime() {
    if (this.apiResponseTimes.length === 0) return 0;
    const sum = this.apiResponseTimes.reduce(
        (acc, entry) => acc + entry.value,
        0,
    );
    return sum / this.apiResponseTimes.length;
  }
}

// Animation Engine
class AnimationEngine {
  constructor(options = {}) {
    this.globalAnimationsEnabled = options.globalAnimationsEnabled !== false;
    this.animationQueue = [];
    this.activeAnimations = new Map();
    this.easingFunctions = options.easingFunctions || {};
  }

  initialize() {
    // Create default easing functions
    this.easingFunctions = {
      ...this.easingFunctions,
      easeInOut: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
      easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
      easeOutBounce: (t) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) {
          return n1 * t * t;
        } else if (t < 2 / d1) {
          return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
          return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
          return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
      },
    };
  }

  applyEasing(progress, easingName = "easeOutQuart") {
    const easingFunction = this.easingFunctions[easingName];
    return easingFunction ? easingFunction(progress) : progress;
  }

  addAnimation(id, animation) {
    this.activeAnimations.set(id, animation);
  }

  removeAnimation(id) {
    this.activeAnimations.delete(id);
  }

  clearAllAnimations() {
    this.activeAnimations.clear();
  }
}

// Settings Manager
class SettingsManager {
  constructor(defaults = {}) {
    this.defaults = defaults;
    this.settings = { ...defaults };
    this.storageKey = "examguardian_settings";
    this.load();
  }

  get(key) {
    return this.settings[key];
  }

  set(key, value) {
    this.settings[key] = value;
    this.save();
  }

  reset() {
    this.settings = { ...this.defaults };
    this.save();
  }

  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.settings = { ...this.defaults, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.warn("Failed to load settings:", error);
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
    } catch (error) {
      console.warn("Failed to save settings:", error);
    }
  }
}

// Process Tree for hierarchical data
class ProcessTree {
  constructor() {
    this.processes = new Map();
    this.children = new Map();
  }

  addProcess(process) {
    this.processes.set(process.pid, process);

    if (process.ppid && process.ppid !== process.pid) {
      if (!this.children.has(process.ppid)) {
        this.children.set(process.ppid, new Set());
      }
      this.children.get(process.ppid).add(process.pid);
    }
  }

  getChildren(pid) {
    return Array.from(this.children.get(pid) || [])
        .map((childPid) => this.processes.get(childPid))
        .filter(Boolean);
  }

  getDescendants(pid) {
    const descendants = [];
    const children = this.getChildren(pid);

    for (const child of children) {
      descendants.push(child);
      descendants.push(...this.getDescendants(child.pid));
    }

    return descendants;
  }

  clear() {
    this.processes.clear();
    this.children.clear();
  }
}

// Threat Detector with ML-like algorithms
class ThreatDetector {
  constructor() {
    this.suspiciousDomains = [
      "chatgpt.com",
      "claude.ai",
      "bard.google.com",
      "perplexity.ai",
      "character.ai",
      "replika.ai",
      "openai.com",
      "github.com/copilot",
    ];
    this.aiProcessPatterns = [
      /chatgpt/i,
      /claude/i,
      /bard/i,
      /copilot/i,
      /ai/i,
    ];
    this.threatHistory = [];
  }

  analyzeProcess(process) {
    let score = 0;
    const factors = [];

    // AI application detection
    if (process.is_ai_app) {
      score += 10;
      factors.push("ai_application");
    }

    // High resource usage
    if (process.memory_percent > 20) {
      score += 3;
      factors.push("high_memory");
    }

    if (process.cpu_percent > 30) {
      score += 2;
      factors.push("high_cpu");
    }

    // Suspicious process name
    for (const pattern of this.aiProcessPatterns) {
      if (pattern.test(process.name)) {
        score += 5;
        factors.push("suspicious_name");
        break;
      }
    }

    return {
      score: Math.min(score, 10),
      factors,
      risk: this.scoreToRisk(score),
    };
  }

  analyzeTab(tab) {
    let score = 0;
    const factors = [];

    // Check domain against suspicious list
    const domain = this.extractDomain(tab.url);
    if (this.suspiciousDomains.some((sd) => domain?.includes(sd))) {
      score += 8;
      factors.push("suspicious_domain");
    }

    // Check for AI-related keywords in title
    if (
        tab.title &&
        this.aiProcessPatterns.some((pattern) => pattern.test(tab.title))
    ) {
      score += 4;
      factors.push("suspicious_title");
    }

    return {
      score: Math.min(score, 10),
      factors,
      risk: this.scoreToRisk(score),
    };
  }

  scoreToRisk(score) {
    if (score >= 8) return "critical";
    if (score >= 6) return "high";
    if (score >= 4) return "medium";
    if (score >= 2) return "low";
    return "minimal";
  }

  extractDomain(url) {
    try {
      return new URL(url).hostname.toLowerCase();
    } catch {
      return null;
    }
  }
}

// Data Processor for batch operations
class DataProcessor {
  constructor() {
    this.batchSize = 50;
  }

  async processInBatches(items, processor, batchSize = this.batchSize) {
    const results = [];

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await Promise.all(
          batch.map((item) => processor(item)),
      );
      results.push(...batchResults);

      // Yield control to prevent blocking
      if (i + batchSize < items.length) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }

    return results;
  }

  filterWithPredicate(items, predicate) {
    return items.filter(predicate);
  }

  sortWithComparator(items, comparator) {
    return [...items].sort(comparator);
  }

  groupBy(items, keySelector) {
    const groups = new Map();

    for (const item of items) {
      const key = keySelector(item);
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key).push(item);
    }

    return groups;
  }
}

// Initialize Dashboard when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  try {
    window.dashboard = new ExamGuardianDashboard();

    // Global error handler
    window.addEventListener("error", (event) => {
      if (window.dashboard) {
        window.dashboard.handleError(event.error, "Global error");
      }
    });

    // Handle unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      if (window.dashboard) {
        window.dashboard.handleError(
            event.reason,
            "Unhandled promise rejection",
        );
      }
    });
  } catch (error) {
    console.error("Failed to initialize ExamGuardian Pro:", error);

    // Show fallback error message
    const errorDiv = document.createElement("div");
    errorDiv.className =
        "alert alert-danger position-fixed top-0 start-0 w-100";
    errorDiv.style.zIndex = "9999";
    errorDiv.innerHTML = `
            <div class="container">
                <h4>⚠️ ExamGuardian Pro Initialization Failed</h4>
                <p>Please refresh the page or contact support if the issue persists.</p>
                <small>Error: ${error.message}</small>
            </div>
        `;
    document.body.appendChild(errorDiv);
  }
});

// Handle page unload cleanup
window.addEventListener("beforeunload", () => {
  if (window.dashboard) {
    window.dashboard.destroy();
  }
});

// Handle page visibility changes for performance optimization
document.addEventListener("visibilitychange", () => {
  if (window.dashboard) {
    if (document.visibilityState === "visible") {
      window.dashboard.state?.set("isVisible", true);
    } else {
      window.dashboard.state?.set("isVisible", false);
    }
  }
});

// Export for module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ExamGuardianDashboard,
    LRUCache,
    StateManager,
    PerformanceTracker,
    AnimationEngine,
    SettingsManager,
    ProcessTree,
    ThreatDetector,
    DataProcessor,
  };
}
