#!/bin/bash

pkill -f "monitor"

bun run traefik
bun run admin
bun run services

./monitor.sh &
