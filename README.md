# Pocketkube
A small service for hosting several pocketbase instances in the same environment.

### Linux server dependenices
fswatch
```
sudo apt update  
sudo apt install fswatch
```

### Getting started
Fill inn environment variables in .env

cd into project folder and run:  
`chmod +x ./addAuthToTraefik.sh && chmod +x ./stop_containers.sh && chmod +x ./start_containers.sh && chmod +x ./monitor.sh`  

#### Build and start containers
`./start_containers.sh`  
Add a username and password for you traefik dashboard when prompted.  
Visit your host at host/admin/_/ for admin dashboard.  
Add entry to "backends" table.  
Visit your host to see your Traefik Dashboard. Validate that your new service is running at host/<app_title>  
Go to host/<app_title>/_/ to access Pocketbase dashboard.  



![](./architecture.png)


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
- [ ] Create interface for managing apps
    - [ ] Design UI
    - [ ] System Architecture
    - [ ] Use Traefik Basic Auth?
    - [ ] Monitor Storage
    - [ ] Monitor CPU
    - [ ] Enable upload of webpage -> target data/<app.id>/public


#### In Progress



#### DONE ✓
- [x] Docker volumes for PB_data  
- [x] Containers always restart  
- [x] Create service which generates the docker-compose file
- [x] Create a service "admin" which serves as the backend admin
- [x] Containers always restart  
- [x] Setup env variables for root project folder
- [x] Setup env variables for root admin in pocketbase
- [x] Setup env variables
- [x] What to do when an app is deleted?
    - [x] Make volume folders named after ID instead of tile
    - [x] Ensure access to projects_data from admin
    - [x] Rename ID folder to DELETED_ID_TITLE
- [x] How to handle duplicate app names?  ---- Don't generate ID -> use title as ID?
- [x] Test deployment on linode
- [x] Add micro service for fetching resource status per app
    `docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}"`
    `docker stats --no-stream --format "table {{.Container}}\t{{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"` <--- This lists all
    - [x] Storage
    - [x] CPU
    - [x] RAM

#### Not going to implement yet
- [ ] Minikube?


#### Troubleshooting
rm  ~/.docker/config.json  

Error  
`open /Users/nils/.docker/buildx/current: permission denied`  
Solution `sudo chown -R nils ~/.docker`  


###### Cannot connect to docker daemon
https://stackoverflow.com/questions/44084846/cannot-connect-to-the-docker-daemon-on-macos



### Future features

Automatic stop and star containers if not active
https://acouvreur.github.io/sablier/#/