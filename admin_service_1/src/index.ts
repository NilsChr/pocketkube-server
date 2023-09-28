import "cross-fetch/polyfill";
import eventsource from "eventsource";
//@ts-ignore
global.EventSource = eventsource;
import PocketBase from "pocketbase";
import { RecordModel } from "pocketbase";
import axios from "axios";
const Docker = require("dockerode");
import * as fs from "fs";
import * as yaml from "js-yaml";
//import delegatePorts from "./delegatePorts";
import generateDockerCompose from "./generateDockerCompose";
//import generateNginxDev from "./generateNginxDev";

const pb_ip = "192.168.192.2:8080";
const pb_url = "http://pb_admin:8080"
const pb = new PocketBase(pb_url);

async function setupRootAdmin() {
  const url = `${pb_url}/api/admins`;
  const payload = {
    email: "admin@admin.com",
    password: "1234567890",
    passwordConfirm: "1234567890"
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
   // console.error("Error:", error);
   console.log("Error")
  }
}

console.log('Setting up root admin');
await setupRootAdmin();
console.log('Setting up root admin complete');

async function gererateDockerFile(apps: RecordModel[]) {
  const config = generateDockerCompose(apps);
  //@ts-ignore
  const yamlData = yaml.dump(config);
  //await Bun.write("docker-compose.generated.yml", yamlData);
  const filePath = "docker-compose.generated.yaml";

  try {
    // Write data to the file synchronously
    fs.writeFileSync("docker-compose.generated.yaml", yamlData, "utf-8");

    console.log(`Data written to ${filePath} successfully.`);
  } catch (error) {
    console.error(`Error writing to ${filePath}: ${error}`);
  }
}
pb.collection("backends").subscribe("*", function (e) {
  console.log(e.action);
  console.log(e.record);

  //runDockerComposeUp();
});



const apps = await pb.collection("backends").getFullList({});
gererateDockerFile(apps);
const config = generateDockerCompose(apps);
