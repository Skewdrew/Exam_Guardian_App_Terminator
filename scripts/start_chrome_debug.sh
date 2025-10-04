#!/bin/bash

echo "Starting Chrome with debugging enabled..."
echo "Chrome will open with monitoring capabilities."
echo "You can use this browser normally for your exam."
echo ""

# Detect OS for Chrome path
OS="$(uname -s)"

if [[ "$OS" == "Darwin" ]]; then
    # macOS
    CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    if [[ -f "$CHROME_PATH" ]]; then
        echo "Starting Chrome on macOS..."
        "$CHROME_PATH" --remote-debugging-port=9222 --user-data-dir="/tmp/chrome_debug" --disable-background-timer-throttling --disable-renderer-backgrounding --disable-backgrounding-occluded-windows &
    else
        echo "[ERROR] Chrome not found at $CHROME_PATH"
        echo "Please install Google Chrome from https://www.google.com/chrome/"
        exit 1
    fi
elif [[ "$OS" == "Linux" ]]; then
    # Linux - try common locations
    CHROME_PATHS=(
        "/usr/bin/google-chrome"
        "/usr/bin/google-chrome-stable"
        "/usr/bin/chromium-browser"
        "/snap/bin/chromium"
        "/usr/bin/chromium"
    )

    CHROME_FOUND=false
    for CHROME_PATH in "${CHROME_PATHS[@]}"; do
        if [[ -x "$CHROME_PATH" ]]; then
            echo "Starting Chrome on Linux: $CHROME_PATH"
            "$CHROME_PATH" --remote-debugging-port=9222 --user-data-dir="/tmp/chrome_debug" --disable-background-timer-throttling --disable-renderer-backgrounding --disable-backgrounding-occluded-windows &
            CHROME_FOUND=true
            break
        fi
    done

    if [[ "$CHROME_FOUND" == false ]]; then
        echo "[ERROR] Chrome/Chromium not found"
        echo "Please install Google Chrome or Chromium:"
        echo "  Ubuntu/Debian: sudo apt-get install google-chrome-stable"
        echo "  Or download from: https://www.google.com/chrome/"
        exit 1
    fi
else
    echo "[ERROR] Unsupported OS: $OS"
    exit 1
fi

echo "Chrome started with debugging on port 9222"
