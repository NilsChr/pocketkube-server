import { RecordModel } from "pocketbase";

const baseCompose = {
  version: "3.3",
  services: {},
  networks: {
    backend: null
  }
};

function addService(
  id: string,
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
    networks: ["backend"],
    volumes: [`\${PROJECT}/data/${id}/data:/pb/pb_data`,`\${PROJECT}/data/${id}/public:/pb/pb_public`],
    labels: [
      `com.pocketkube`,
      `traefik.enable=true`,
      `traefik.http.routers.${title}.rule=Host(\`\${HOST}\`) && PathPrefix(\`/${title}\`)`,
      `traefik.http.routers.${title}.entrypoints=\${ENTRYPOINTS}`,
      `traefik.http.routers.${title}.middlewares=${title}-stripprefix`,
//      `traefik.http.routers.${title}.tls.certresolver=letsencrypt`,
      `traefik.http.middlewares.${title}-stripprefix.stripprefix.prefixes=/${title}`,
      `traefik.http.services.${title}.loadbalancer.server.port=8080`,
    ]
  };
}

export default function generateCompose(apps: {id: string, title:string}[]): any {
  const template = JSON.parse(JSON.stringify(baseCompose));
  let port = 9000;
  for (let app of apps) {
    template["services"][app.id] = addService(app.id, app.title, "web", port++);
  }

  return template;
}
