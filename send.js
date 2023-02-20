import { createRequire } from "module";
import apn from "@parse/node-apn";

let args = process.argv.slice(2);

const token = args.shift();

if (!token) {
  console.warn("Usage:  $ node send.js <apns_location_push_token>");
  process.exit();
}

const require = createRequire(import.meta.url);

const apnsConfig = require('./config/apns.json');
const apnProvider = new apn.Provider(apnsConfig);

const msg = new apn.Notification({
  topic: apnsConfig.bundleIdentifier + '.location-query',
  pushType: 'location',
  priority: 10
});

apnProvider.client.logger.enabled = true;
console.log('[message] ', msg, '[headers]', msg.headers());

apnProvider.send(msg, token).then((response) => {
   console.log("[response]", response);
   apnProvider.shutdown();
});



