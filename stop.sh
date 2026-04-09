#!/bin/bash
pkill -f "node dist/main" && echo "Stopped" || echo "Not running"
