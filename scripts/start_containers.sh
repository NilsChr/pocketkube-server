#!/bin/bash

echo "start_containers.sh started"

# Get the script's directory
script_dir=$(dirname "$0")

file_path="$script_dir/../data/.traefik/userfile"

if [ ! -f "$file_path" ]; then

    folder_path="$script_dir/../data"
    if [ ! -d "$folder_path" ]; then
        # Create the folder
        mkdir -p "$folder_path"
        echo "Folder created: $folder_path"
    fi 

    folder_path="$script_dir/../data/.traefik"
    if [ ! -d "$folder_path" ]; then
        # Create the folder
        mkdir -p "$folder_path"
        echo "Folder created: $folder_path"
    fi 

    "$script_dir/addAuthtoTraefik.sh"
fi 

pkill -f "monitor"
"$script_dir/monitor.sh" &

# Start the Traefik service and micro_services
if [[ "$PK_ENV" == "production" ]]; then
    docker-compose -f docker-compose.traefik.https.yml up -d --build
    docker-compose -f docker-compose.micro_services.https.yml up -d --build
else
    docker-compose -f docker-compose.traefik.yml up -d --build
    docker-compose -f docker-compose.micro_services.yml up -d --build
fi

# Start the admin service
docker-compose -f docker-compose.admin.yml up -d --build

# Start the services
docker-compose -f docker-compose.services.yml up -d --build
