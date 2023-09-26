### Traefik docs
https://doc.traefik.io/traefik/v2.10/operations/api/


#### Generate password ith htpasswd
Generate a username and password hashed wihth bcrypt. Output the admin:hashed password with escaped $ signs.

`$(htpasswd -nbB USER "PASS") | sed -e s/\\$/\\$\\$/g`