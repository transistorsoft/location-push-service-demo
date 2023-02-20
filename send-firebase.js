import admin from "firebase-admin"
import {initializeApp} from 'firebase-admin/app'
import { getMessaging } from "firebase-admin/messaging";
import { createRequire } from "module";

let args = process.argv.slice(2);
const token = args.shift();

const options = {
   // A silent notification is one with no message or body so no notification appears to the user.
   silent: false,
   background: false
};

for (let n=0,len=args.length;n<len;n++) {
   const arg = args[n];
   if (arg === '--silent') {
      options.silent = true
   } else if (arg == '--background') {
      options.background = true
   }
}

// Hack a require function for loading config json file
const require = createRequire(import.meta.url);

const serviceAccount = require('./config/service_account_key.json')

const app = admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
})

const messaging = getMessaging(app);

const headers = {}

if (options.background) {
   headers["apns-topic"] = "com.transistorsoft.push";
   headers["apns-push-type"] = "background";// <-- required to send ios background-push.
   headers["apns-priority"] = "5"; // Must be `5` when `contentAvailable` is set to true.
};

const msg = {
   token: token,
   notification: !options.silent ? {
      title: "From Firebase Messaging",
      body: "This is a test"
   } : undefined,
   apns: {
      payload: {
         aps: {
            contentAvailable: options.background
         }
      },
      headers: headers
   },
   data: {
      command: "getCurrentPosition"
   }
}

messaging.send(msg).then((result) => {
   console.log('[SUCCESS]', msg, result);
}).catch((error) => {
   console.error('[ERROR]', error.errorInfo);
});

