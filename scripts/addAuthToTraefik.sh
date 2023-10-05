#!/bin/bash

echo "addAuthToTraefik.sh started"

# Get the script's directory
script_dir=$(dirname "$0")

# Prompt the user for a username
echo "Create a username and password for your Traefik dashboard"
read -p "Enter username: " username

# Prompt the user for a password (without echoing to the terminal)
read -s -p "Enter password: " password
echo

# Run the command to generate the hashed password and escape the $ characters
# hashed_password=$(htpasswd -nbB "$username" "$password" | sed -e s/\\$/\\$\\$/g)
hashed_password=$(htpasswd -nbB "$username" "$password")

cat <<EOF > $script_dir/../data/.traefik/userfile
$hashed_password
EOF

# echo "docker-compose.test.yaml has been created with the updated username and password."