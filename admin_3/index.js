import PocketBase from 'pocketbase'
// import 'cross-fetch/polyfill';
import 'cross-fetch/dist/node-polyfill.js';
import eventsource from 'eventsource';
global.EventSource = eventsource;

const url = 'http://admin_pb:8080';
console.log(`Connecting to ${url}`)
const pb = new PocketBase(url);

console.log("hello world");

// Subscribe to changes in any backends record
pb.collection('backends').subscribe('*', function (e) {
    console.log(e.action);
    console.log(e.record);
});

async function main() {
    const rec = await pb.collection('backends').getFullList({});
    console.log(rec);
}

main();