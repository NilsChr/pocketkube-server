#!/bin/bash

echo "stopp_containers.sh started"

pkill -f "monitor"

bun run traefik:down
bun run admin:down
bun run services:down