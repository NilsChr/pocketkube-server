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
- [ ] What to do when an app is deleted?
- [ ] How to handle duplicate app names?
- [ ] Minikube?
- [ ] Start all services on startup  
- [ ] Test deployment on linode
- [ ] Create interface for managing apps
    - [ ] Use Traefik Basic Auth?




#### DONE ✓
- [x] Docker volumes for PB_data  
- [x] Containers always restart  
- [x] Create service which generates the docker-compose file
- [x] Create a service "admin" which serves as the backend admins
- [x] Containers always restart  
- [x] Setup env variables for root project folder
- [x] Setup env variables for root admin in pocketbase
- [x] Setup env variables




#### Troubleshooting
rm  ~/.docker/config.json  

Error  
`open /Users/nils/.docker/buildx/current: permission denied`  
Solution `sudo chown -R nils ~/.docker`  



### Future features

Automatic stop and star containers if not active
https://acouvreur.github.io/sablier/#/