### Traefik docs
https://doc.traefik.io/traefik/v2.10/operations/api/


#### Generate password ith htpasswd
`$(htpasswd -nbB USER "PASS") | sed -e s/\\$/\\$\\$/g`