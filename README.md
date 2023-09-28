### Traefik docs
https://doc.traefik.io/traefik/v2.10/operations/api/


#### Generate password ith htpasswd
Generate a username and password hashed wihth bcrypt. Output the admin:hashed password with escaped $ signs.

`$(htpasswd -nbB USER "PASS") | sed -e s/\\$/\\$\\$/g`

#### How to run

Start traefik `npm run traefik`, run `npm run traefik:down` to stop  
Start admin `npm run admin`, run `npm run admin:down` to stop  
Start services `npm run services`, run `npm run services:down` to stop


#### Todo
Create a service "admin" which serves as the backend admins.  
All entries in this db will be a container.  
Create service which generates the docker-compose file.  
  
FIX - docker volumes for PB_data  
FIX - containers always restart  
FIX - start all services on startup  
