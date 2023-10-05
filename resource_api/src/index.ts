console.log("Hello via Bun!");
const util = require("util");
const { exec } = require("child_process");

const execPromise = util.promisify(exec);

Bun.serve({
  port: 7777,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/storage") {
      const url = "/";
      const stats = "not implemented";
      try {
        const { stdout, stderr } = await execPromise("du -sh /Users/nils/Documents/workspace/pocketbase/pocketbaseTraefik/data");
        console.log(`stdout:\n${stdout}`);
        console.error(`stderr: ${stderr}`);
        return new Response(JSON.stringify(stdout));

      } catch (error) {
        return new Response(JSON.stringify(error));

       // console.error(`Error: ${error.message}`);
      }
    }

    return new Response("404!");
  }
});
