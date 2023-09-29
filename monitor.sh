#!/bin/bash

# Define the file to monitor
file_to_watch="/Users/nils/Documents/workspace/pocketbase/pocketbaseTraefik/data/.compose/docker-compose.services.yml"
echo "Watching $file_to_watch"
fswatch -0 "$file_to_watch" | while read -d "" change; do
    echo "File $file_to_watch has been modified."
    cp $file_to_watch docker-compose.services.yml
    # docker-compose -f docker-compose.services.yml down
    docker-compose -f docker-compose.services.yml up -d --build
done
