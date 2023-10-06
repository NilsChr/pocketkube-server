#!/bin/bash

echo "start_containers.sh started"

#./addAuthtoTraefik.sh

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
# echo "File does not exist. Running the script..."

pkill -f "monitor"

echo "running bun commands"
bun run traefik
bun run admin
bun run micro_services
# bun run services

# cd ./scripts

"$script_dir/monitor.sh" &
