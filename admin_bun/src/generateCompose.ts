import { RecordModel } from "pocketbase";

const baseCompose = {
  version: "3.3",
  services: {},
  networks: {
    backend: null
  }
};

function addService(
  title: string,
  entrypoint: "web" | "websecure",
  port: number
) {
  return {
    restart: "always",
    build: {
      context: ".",
      dockerfile: "Dockerfile.pocketbase"
    },
    ports: [`${port}:8080`],
    networks: ["backend"],
    //volumes: [`./data/${title}:/pb/pb_data`],
    volumes: [`\${PROJECT}/data/${title}:/pb/pb_data`],
    labels: [
      `traefik.enable=true`,
      `traefik.http.routers.${title}.rule=Host(\`localhost\`) && PathPrefix(\`/${title}\`)`,
      `traefik.http.routers.${title}.entrypoints=\${ENTRYPOINTS}`,
      `traefik.http.middlewares.${title}-stripprefix.stripprefix.prefixes=/${title}`,
      `traefik.http.routers.${title}.middlewares=${title}-stripprefix`,
      `traefik.http.services.${title}.loadbalancer.server.port=8080`
    ]
  };
}

export default function generateCompose(apps: string[]): any {
  const template = JSON.parse(JSON.stringify(baseCompose));
  let port = 9000;
  for (let title of apps) {
    template["services"][title] = addService(title, "web", port++);
  }

  return template;
}
