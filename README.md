# iOS Location Push Service Demo

This is just a simple node script to send an APNS notification for the [iOS Location Push Service Extension](https://developer.apple.com/documentation/corelocation/creating_a_location_push_service_extension?language=objc).

## Installation

```
yarn install

```

## Configuration

Edit the file `config/apns.json.sample` and save as `config/apns.json`

- The `token.key` comes from your *Apple Developer Console* `APNS_KEY.p8`, the one created with *[x] Apple Push Notifications service (APNs)*. enabled
- The `token.keyId` can be obtained by selecting the `APNS KEY` above in *Apple Developer Console*. 

![](https://dl.dropboxusercontent.com/MNtdrZsutjJwl1nn?dl=1)

```json
{
  "token": {
    "key": "/path/to/your/apns-key.p8",
    "keyId": "<10-character KEY ID>",
    "teamId": "<Apple Developer Team ID>"
  },
  "bundleIdentifier": "com.transistorsoft.locationPushServiceExtension"
}
```


node send.js <apns_location_push_token>
```



