#!/bin/bash

# Function to check if docker-compose is installed
check_docker_compose() {
  if ! command -v docker-compose &>/dev/null; then
    echo "docker-compose not found. Please install Docker Compose first."
    exit 1
  fi
}

# Function to start the services
start_services() {
  echo "Building and starting the HaloBE and HaloFE services..."

  # Ensure Docker is running
  if ! docker info &>/dev/null; then
    echo "Docker is not running. Please start Docker and try again."
    exit 1
  fi

  # Run docker-compose to build and start containers
  docker-compose -f docker-compose.yml up --build -d

  if [ $? -eq 0 ]; then
    echo "HaloBE and HaloFE are now up and running."
  else
    echo "Error starting services. Check the docker-compose logs for details."
    exit 1
  fi
}

# Function to tail the logs
tail_logs() {
  echo "Tailing the logs from all containers..."

  # This will stream logs from all containers until interrupted
  docker-compose logs -f
}

# Main script execution
main() {
  # Check if docker-compose is available
  check_docker_compose

  # Start the services
  start_services

  # Optionally, tail logs (remove the comment to enable)
  # tail_logs
}

# Call main function
main
