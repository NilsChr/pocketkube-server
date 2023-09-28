import "cross-fetch/polyfill";
import eventsource from "eventsource";
//@ts-ignore
global.EventSource = eventsource;
import PocketBase from "pocketbase";
import { RecordModel } from "pocketbase";
import axios from "axios";
const Docker = require("dockerode");
import * as fs from "fs";

console.log("Hello via Bun!");

const docker = new Docker({ host: "http://localhost", port: 2375 });

const pb_url = "http://admin_pb:8080";
const pb = new PocketBase(pb_url);

async function main() {
  await setupRootAdmin();
  const adminData = await pb.admins.authWithPassword(
    "admin@admin.com",
    "1234567890"
  );
  const collections = await pb.collections.getFullList({ sort: "-created" });
  console.log("Got Collections");
  console.log(collections);
  const backendSchemaExists =
    collections.filter((c) => c.name === "backends")[0] || null;
  console.log("backendSchemaExists", backendSchemaExists);
  if (backendSchemaExists === null) {
    console.log("Creating schema: backends");
    await pb.collections.create({
      id: "ob2i2yjehrsu9nt",
      name: "backends",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "1awpnbqi",
          name: "title",
          type: "text",
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: ""
          }
        },
        {
          system: false,
          id: "bkvuvuua",
          name: "inactive",
          type: "bool",
          required: false,
          presentable: false,
          unique: false,
          options: {}
        }
      ],
      indexes: [],
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {}
    });
  }

  pb.collection("backends").subscribe("*", function (e) {
    console.log(e.action);
    console.log(e.record);

    generateOutput();
  });
}
await main();


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
    console.error("Error:", error);
  }
}

async function generateOutput() {
    console.log('generating output');
}