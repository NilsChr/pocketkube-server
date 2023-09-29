### Traefik docs
https://doc.traefik.io/traefik/v2.10/operations/api/


#### Generate password ith htpasswd
Generate a username and password hashed wihth bcrypt. Output the admin:hashed password with escaped $ signs.

`echo $(htpasswd -nbB USER "PASS") | sed -e s/\\$/\\$\\$/g`

#### How to run

##### Traefik
Start `npm run traefik`  
Stop  `npm run traefik:down`  

##### Admin
Start `npm run admin`  
Stop  `npm run admin:down`  

##### Services
Start `npm run services`  
Stop  `npm run services:down`  


#### TODO ✓
- [ ] Start all services on startup  
- [ ] Test deployment on linode
- [ ] Create interface for managing apps
    - [ ] Use Traefik Basic Auth?
- [ ] Setup variables for root admin in pocketbase




#### DONE ✓
- [x] docker volumes for PB_data  
- [x] containers always restart  
- [x] Create service which generates the docker-compose file
- [x] Create a service "admin" which serves as the backend admins
- [x] containers always restart  




#### Troubleshooting
rm  ~/.docker/config.json

Error
`open /Users/nils/.docker/buildx/current: permission denied`
Solution `sudo chown -R nils ~/.docker`