#!/bin/bash
echo "monitor.sh started"

# Define the file to monitor
file_to_watch="./data/.compose/docker-compose.services.yml"
echo "Watching $file_to_watch"

# fswatch -0 "$file_to_watch" | while read -d "" change; do   <- macOS
while inotifywait -e modify "$file_to_watch"; do  
    echo "File $file_to_watch has been modified."
    cp $file_to_watch docker-compose.services.yml

    docker stop $(docker ps -q -f label=com.pocketkube)
    docker rm $(docker ps -aq -f label=com.pocketkube)

    # Remove images associated with those containers
    docker rmi $(docker images -q -f "label=com.pocketkube")

    # docker-compose -f docker-compose.services.yml down
    docker-compose --env-file .env -f docker-compose.services.yml up -d --build
done
