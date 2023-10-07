console.log("Hello via Bun!");


Bun.serve({
  port: 8080,
  async fetch(req) {
    return new Response('connection test');
  }
});


setInterval(async function() {
  console.log('testing');

  try {
    const res = await fetch('http://admin_resources:8080');
    console.log(res.status);
    const blob = await res.blob();

    console.log(await blob.json());
  } catch(e) {
    console.log(e)
  }

},10000)