import "cross-fetch/polyfill";
import eventsource from "eventsource";
//@ts-ignore
global.EventSource = eventsource;
import PocketBase from "pocketbase";
import axios from "axios";
import * as yaml from "js-yaml";
import generateCompose from "./generateCompose";
const fs = require('fs');

const composeFilePath = "./output/docker-compose.services.yml";
const pb_url = "http://admin:8080";
const pb = new PocketBase(pb_url);

console.log('PASS', process.env || 'no password found');

const backendsSchema =  {
  "id": "ob2i2yjehrsu9nt",
  "name": "backends",
  "type": "base",
  "system": false,
  "schema": [
      {
          "system": false,
          "id": "1awpnbqi",
          "name": "title",
          "type": "text",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {
              "min": null,
              "max": null,
              "pattern": ""
          }
      },
      {
          "system": false,
          "id": "bkvuvuua",
          "name": "inactive",
          "type": "bool",
          "required": false,
          "presentable": false,
          "unique": false,
          "options": {}
      }
  ],
  "indexes": [],
  "listRule": null,
  "viewRule": null,
  "createRule": null,
  "updateRule": null,
  "deleteRule": null,
  "options": {}
}


async function main() {
  await setupRootAdmin();
  const adminData = await pb.admins.authWithPassword(
    process.env.ROOTADMIN || '',
    process.env.ROOTADMINPW || ''
  );
  const collections = await pb.collections.getFullList({ sort: "-created" });
  //console.log("Got Collections");
  //console.log(collections);
  const backendSchemaExists =
    collections.filter((c) => c.name === "backends")[0] || null;
  //console.log("backendSchemaExists", backendSchemaExists);
  if (backendSchemaExists === null) {
    console.log("Creating schema: backends");
    await pb.collections.create(backendsSchema);
  }

  pb.collection("backends").subscribe("*", function (e) {
    console.log(e.action);
    console.log(e.record);

    if(e.action === 'delete') {
      fs.rename(`/pb_instances/${e.record.title}`, `/pb_instances/DELETED_${e.record.id}_${e.record.title}`, (err:any) => {
        if (err) {
          console.error(`Error renaming folder: ${err}`);
        } else {
          console.log('Folder renamed successfully');
        }
      });
    }


    generateOutput();
  });
  await generateOutput();
}
await main();

async function setupRootAdmin() {
  const url = `${pb_url}/api/admins`;
  const payload = {
    email: process.env.ROOTADMIN,
    password: process.env.ROOTADMINPW,
    passwordConfirm: process.env.ROOTADMINPW,
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.log('Error when creating root admin');
    //console.error("Error:", error);
  }
}

async function generateOutput() {
  console.log("generating output");

  const records = await pb.collection("backends").getFullList({
    sort: "-title"
  });

  const obj = generateCompose(records.map((r) => {
    return {
      id: r.id,
      title: r.title
    }
  }));
  const yamlData = yaml.dump(obj);
  console.log(yamlData)
  await Bun.write(composeFilePath, yamlData);
}
