#!/bin/bash

# Start HaloBE (Backend)
echo "Starting HaloBE (Backend)..."
cd haloBE || exit
yarn dev &
BACKEND_PID=$!
echo "HaloBE is running with PID $BACKEND_PID"

# Start HaloFE (Frontend)
echo "Starting HaloFE (Frontend)..."
cd ../haloFE || exit
pnpm dev &
FRONTEND_PID=$!
echo "HaloFE is running with PID $FRONTEND_PID"

# Wait for user to stop the servers
echo "Press [CTRL+C] to stop both servers."

# Trap the exit signal and kill both processes when the script is stopped
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT

# Wait for both servers to finish
wait $BACKEND_PID $FRONTEND_PID
