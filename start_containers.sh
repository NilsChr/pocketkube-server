#!/bin/bash

#./addAuthtoTraefik.sh

file_path="./data/.traefik/userfile"

if [ ! -f "$file_path" ]; then

    folder_path="./data"
    if [ ! -d "$folder_path" ]; then
        # Create the folder
        mkdir -p "$folder_path"
        echo "Folder created: $folder_path"
    fi 

    folder_path="./data/.traefik"
    if [ ! -d "$folder_path" ]; then
        # Create the folder
        mkdir -p "$folder_path"
        echo "Folder created: $folder_path"
    fi 


    ./addAuthtoTraefik.sh
fi 
# echo "File does not exist. Running the script..."

pkill -f "monitor"

bun run traefik
bun run admin
# bun run services

./monitor.sh &
