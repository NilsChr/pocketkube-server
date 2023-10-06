console.log("Hello via Bun!");
const util = require("util");
// const { exec } = require("child_process");
const { execSync } = require("child_process");

//const execPromise = util.promisify(exec);

Bun.serve({
  port: 8080,
  async fetch(req) {
    try {
      const command =
        'docker stats --no-stream --format "table {{.Container}}\t{{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"';

      const result = execSync(command);
      console.log("Result", result);
      return new Response(JSON.stringify(mapResult(result.toString())));
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
    console.log(line)
    const columns = line.trim().split(/\s+/);

    if (columns.length >= 4) {
      const [containerId, name, cpu, memUsage] = columns;
      //const [mem, usage, limit] = memUsage.split("/").map((s) => s.trim());

      return {
        containerId,
        name: name.split('-')[1] || null,
        cpu,
        memUsage
       /* mem: {
          usage,
          limit
        }*/
      };
    } else {
      // Handle lines with insufficient columns (optional)
      return null;
    }
  });

  // Filter out any null values (lines with insufficient columns)
  const validContainerData = containerData.filter((data) => data !== null && data.name !== null);

  return validContainerData;
}
