# Prompt the user for a username
echo "Create a username and password for your Traefik dashboard"
read -p "Enter username: " username

# Prompt the user for a password (without echoing to the terminal)
read -s -p "Enter password: " password
echo

# Run the command to generate the hashed password and escape the $ characters
# hashed_password=$(htpasswd -nbB "$username" "$password" | sed -e s/\\$/\\$\\$/g)
hashed_password=$(htpasswd -nbB "$username" "$password")

# Replace the placeholder with the generated password in the template
# sed "s|\${BASICAUTH}|$hashed_password|" docker-compose.traefikTemplate.yml > docker-compose.traefik.yml

cat <<EOF > ./data/.traefik/userfile
$hashed_password
EOF

echo "docker-compose.test.yaml has been created with the updated username and password."