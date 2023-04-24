
const https = require('https');
 
_EXTERNAL_URL = 'https://api.riscnetworks.com/1_0/assets/getAssets/byDevice/11820168430183?deviceid=11820168430183';
const option = {
    "uri": {
        "protocol": "https:",
        "slashes": true,
        "auth": null,
        "host": "api.riscnetworks.com",
        "port": 443,
        "hostname": "api.riscnetworks.com",
        "hash": null,
        "search": "?deviceid=11820168430183",
        "query": "deviceid=11820168430183",
        "pathname": "/1_0/assets/getAssets/byDevice/11820168430183",
        "path": "/1_0/assets/getAssets/byDevice/11820168430183?deviceid=11820168430183",
        "href": "https://api.riscnetworks.com/1_0/assets/getAssets/byDevice/11820168430183?deviceid=11820168430183"
       },
       "method": "GET",
       "headers": {
        "accept": "application/json",
        token: "LxOc9iJ3ndk8UZqz4HtznKKvWpO0saIuvJOO",
        assessmentcode: "ZDMzYThmOjc6MzMxOjE6MTowOjE="
       }
      }

const callExternalApiUsingHttp = (callback) => {
    https.get(option, (resp) => {
    let data = '';
    
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });
    
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
       // return callback(data);
        console.log(JSON.stringify(data));
    });
    
    }).on("error", (err) => {
       
    console.log("Error: " + err.message);
    });
}

module.exports.callApi = callExternalApiUsingHttp;