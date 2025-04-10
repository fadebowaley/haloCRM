#!/bin/bash
#Usage cmd <port>

# Check if port number is provided as argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 <port>"
    exit 1
fi

# Retrieve the port number from the command line argument
port="$1"

# Check if the provided port is a valid number
if ! [[ "$port" =~ ^[0-9]+$ ]]; then
    echo "Invalid port number: $port"
    exit 1
fi

# Find the PID(s) of the process(es) using the specified port
pids=$(lsof -t -i :"$port")

# Check if any process is using the specified port
if [ -z "$pids" ]; then
    echo "No process is using port $port"
    exit 0
fi

# Kill the processes using the specified port
echo "Killing processes using port $port:"
echo "$pids" | xargs kill -9

echo "Processes killed successfully"
