#!/bin/sh

# Stop and remove the running containers
sudo docker-compose down

# Build images and recreate containers if needed
sudo docker-compose up -d --build

# Clean up unused images
sudo docker image prune -f
