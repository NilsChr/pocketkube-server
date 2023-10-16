#!/bin/bash

echo "stopp_containers.sh started"

pkill -f "monitor"

# bun run traefik:down
docker-compose -f docker-compose.traefik.yml down
# bun run admin:down
docker-compose -f docker-compose.admin.yml down
# bun run services:down
docker-compose -f docker-compose.services.yml down
#bun run micro_services:down
docker-compose -f docker-compose.micro_services.yml down