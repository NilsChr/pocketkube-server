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
    const res = await fetch('http://admin_resources');
    console.log(res);
  } catch(e) {
    console.log(e)
  }

},10000)