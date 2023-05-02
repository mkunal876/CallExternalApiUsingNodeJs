const request = require('request');
const prettyjson = require('prettyjson');
require('dotenv').config()
 
const callExternalApiUsingRequest = (deviceId, callback) => {
    console.log(`test======> ${deviceId}`)
    const option = {
        "uri": {
            "protocol": "https:",
            "slashes": true,
            "auth": null,
            "host": "api.riscnetworks.com",
            "port": 443,
            "hostname": "api.riscnetworks.com",
            "hash": null,
            "search": `?deviceid=${deviceId}`,
            "query": `deviceid=${deviceId}`,
            "pathname": `/1_0/assets/getAssets/byDevice/${deviceId}`,
            "path": `/1_0/assets/getAssets/byDevice/${deviceId}?deviceid=${deviceId}`,
            "href": `https://api.riscnetworks.com/1_0/assets/getAssets/byDevice/${deviceId}?deviceid=${deviceId}`
           },
           "method": "GET",
           "headers": {
            "accept": "application/json",
            token: process.env.FLEXERA_TOKEN_ID,
            assessmentcode: "ZDMzYThmOjc6MzMxOjE6MTowOjE="
           }
          }
    console.log("test endpoint")
    request(option, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
     const output = JSON.parse(body);
     const print_to_file = JSON.stringify(output, null, "\t")




var options = {
  noColor: true
};

console.log("rendered pretty data=====>",prettyjson.render(print_to_file, options));
    // console.log("tes....data ====>",print_to_file)
    return callback(res);
    });
}



const getAssetDetailsApiByStackId = (stackId, callback) => {
    console.log(`test======> ${stackId}`)
    const option = {
        "uri": {
            "protocol": "https:",
            "slashes": true,
            "auth": null,
            "host": "api.riscnetworks.com",
            "port": 443,
            "hostname": "api.riscnetworks.com",
            "hash": null,
            "search": `?stackid=${stackId}`,
            "query": `stackid=${stackId}`,
            "pathname": `/1_0/assets/getAssets/byStack/${stackId}`,
            "path": `/1_0/assets/getAssets/byStack/${stackId}?stackid=${stackId}`,
            "href": `https://api.riscnetworks.com/1_0/assets/getAssets/byStack/${stackId}?stackid=${stackId}`
           },
           "method": "GET",
           "headers": {
            "accept": "application/json",
            token: process.env.FLEXERA_TOKEN_ID,
            assessmentcode: "ZDMzYThmOjc6MzMxOjE6MTowOjE="
           }
          }
    console.log("test endpoint")
    request(option, (err, res, body) => {
    if (err) { 
        return callback(err);
     }
     const output = JSON.parse(body);
     const print_to_file = JSON.stringify(output, null, "\t")




var options = {
  noColor: true
};

console.log("rendered pretty data=====>",prettyjson.render(print_to_file, options));
    // console.log("tes....data ====>",print_to_file)
    return callback(res);
    });
}

const getAssetDetailBySerach = (key, callback) => {
    console.log(`test======> ${key}`)
    const searchStr = key
    const option = {
        "uri": {
            "protocol": "https:",
            "slashes": true,
            "auth": null,
            "host": "api.riscnetworks.com",
            "port": 443,
            "hostname": "api.riscnetworks.com",
            "hash": null,
            "search": `?searchString=${searchStr}`,
            "query": `searchString=${searchStr}`,
            "pathname": `/1_0/assets/getAssets/byStack/${searchStr}`,
            "path": `/1_0/assets/search/${searchStr}`,
            "href": `https://api.riscnetworks.com/1_0/assets/search/${searchStr}`
           },
           "method": "GET",
           "headers": {
            "accept": "application/json",
            token: process.env.FLEXERA_TOKEN_ID,
            assessmentcode: "ZDMzYThmOjc6MzMxOjE6MTowOjE="
           }
          }
    console.log("test endpoint",option)
    request(option, (err, res, body) => {
    if (err) { 
        console.log(err)
        return callback(err);
     }
     const data = JSON.parse(body);
     //const print_to_file = JSON.stringify(output, null, "\t")
    const stackid = data.assets && data.assets.map((e)=>e.stacks).flat().map((stack)=>stack.stackid).toString()

    console.log("rendered stackid=====>",stackid);

   // getAssetDetailsApiByStackId(stackid, function(response){
       // res.write(JSON.stringify(response));
        return callback(res);
   // });
// var options = {
//   noColor: true
// };

//console.log("rendered pretty data=====>",prettyjson.render(print_to_file, options));
//const parsedData = JSON.parse(print_to_file);
//console.log("all asset detail data: ",JSON.parse(body).assets.map((e)=>e.stacks).flat().map((stack)=>stack.stackid).toString());
    // console.log("tes....data ====>",JSON.parse(body))
   // return callback(res);
    });
}


const getPriceByStackIdAndProviderId = (filter, callback) => {

// const myJSONObject = {
//     "filter_by": "stack",
//     "filter_ids": [1001965],
//     "providerids": [2]
//     };
    request({
        url: "https://api.riscnetworks.com/1_0/iaas/pricing",
        method: "POST",
        json: true,   // <--Very important!!!
        headers: {
            "accept": "application/json",
            token: process.env.FLEXERA_TOKEN_ID,
            assessmentcode: "ZDMzYThmOjc6MzMxOjE6MTowOjE="
           },
        body: filter
    }, function (err, response, body){
        if (err) { 
            console.log("test error",err)
            return callback(err);
         }
         //const data = JSON.parse(body.pricing);
         const priceList  = body.pricing;
         const inventroyList = priceList.filter(price => price.basis === 'inventory')
         const usageList = priceList.filter(price => price.basis === 'usage')
         const iaasFullDetail = {
            inventroyList: inventroyList,
            usageList: usageList
         }
        console.log("rendered IaaS pricing=====>",body.pricing);
        return callback(iaasFullDetail)
    });

}





module.exports.callApi = {callExternalApiUsingRequest, getAssetDetailsApiByStackId, getAssetDetailBySerach, getPriceByStackIdAndProviderId};