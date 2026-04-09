#!/bin/bash
PORT=3000 nohup node dist/main > app.log 2>&1 &
echo "Started on http://localhost:3000 (PID $!, logs in app.log)"
