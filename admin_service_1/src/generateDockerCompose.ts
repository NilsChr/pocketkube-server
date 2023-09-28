import { RecordModel } from "pocketbase";

const template = {
  version: "3",
  services: {

  }
};

function createService(title: string, host: string, web: 'web' | 'websecure', port: number) {
  return {
    build: {
      context: ".",
      dockerfile: "Dockerfile.pocketbase"
    },
    ports: [`${port}:8080`],
    labels: [
      `traefik.enable=true`,
      `traefik.http.routers.${title}.rule=Host(\`${host}\`) && PathPrefix(\`/${title}\`)`,
      `traefik.http.routers.${title}.entrypoints=${web}`,
      `traefik.http.middlewares.${title}-stripprefix.stripprefix.prefixes=/${title}`,
      `traefik.http.routers.${title}.middlewares=${title}-stripprefix`,
      `traefik.http.services.${title}.loadbalancer.server.port=8080`
    ]
  };
}

export default function generateDockerCompose(apps: RecordModel[]): string {
  const compose = JSON.parse(JSON.stringify(template));
  apps.forEach((a) => {
    compose["services"][a.title] = createService(a.title,'localhost',  'web', 8080);
  });

  return compose;
}
