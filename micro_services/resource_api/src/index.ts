const { execSync } = require("child_process");
import * as fs from 'fs';

// Get usage for whole disk
// du -sh / 2>/dev/null | tail -n 1 | cut -f1 | tr -d '\n'

interface ContainerData {
  containerId: string;
  name: string | null;
  cpu: string;
  memUsage: string;
  storage: number;
};


Bun.serve({
  port: 8080,
  async fetch(req) {
    try {
      const command =
        'docker stats --no-stream --format "table {{.Container}}\t{{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"';

      const result = execSync(command);
      console.log("Result", result);
      const resObjects = mapResult(result.toString());

      for(let res of resObjects) {
        await getStorage(res);
      }

      return new Response(JSON.stringify(resObjects));
    } catch (error: any) {
      console.log("Error", error);
      return new Response(`Error: ${error.message}`);
    }
  }
});

function mapResult(result: string) {
  // Split the input string into lines
  const lines = result.split("\n");

  // Remove the header line
  const header = lines.shift();

  // Extract data from each line and create objects
  const containerData = lines.map((line) => {
    const columns = line.trim().split(/\s+/);
    if (columns.length >= 4) {
      const [containerId, name, cpu, memUsage] = columns;
      return {
        containerId,
        name: name.split("-")[1] || null,
        cpu,
        memUsage,
        storage: -1
      };
    } else {
      return null;
    }
  });

  const validContainerData = containerData.filter(
    (data) => data !== null && data.name !== null
  );

  return validContainerData;
}

async function getStorage(data: ContainerData | null) {
  if(data === null) return;
  const path = `/pb/${data.name}`;
  if (!folderExists(path)) return;
  const command = `du -sh ${path} | tail -n 1 | cut -f1 | tr -d '\n'`;
  const result = execSync(command);
  data.storage = result.toString();
}

function folderExists(path: string): boolean {
  try {
    const stats = fs.statSync(path);
    return stats.isDirectory();
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return false; 
    } else {
      throw err;
    }
  }
}

