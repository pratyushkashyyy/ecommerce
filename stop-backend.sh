#!/bin/bash

# Stop Backend Script
# Stops the gunicorn backend server

BACKEND_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/backend"

echo "Stopping backend server..."

if [ -f "$BACKEND_DIR/gunicorn.pid" ]; then
    PID=$(cat "$BACKEND_DIR/gunicorn.pid")
    if ps -p $PID > /dev/null; then
        kill $PID
        echo "✅ Backend stopped (PID: $PID)"
        rm "$BACKEND_DIR/gunicorn.pid"
    else
        echo "⚠️  Process not running"
        rm "$BACKEND_DIR/gunicorn.pid"
    fi
else
    echo "⚠️  No PID file found, trying to kill by name..."
    pkill -f "gunicorn.*app:app" && echo "✅ Backend stopped" || echo "❌ No backend process found"
fi
