const express = require('express');
const apiCallFromRequest = require('./Request')
const utils = require('./utils');
const apiCallFromNode = require('./NodeJsCall')
const cors = require('cors');
const { default: insertSpacesBetweenWords } = require('./utils');
//import routes from './routes';

const app = express();
app.use(cors());
app.listen(4001,()=> {

    console.log(`app listening on 4001`)
})

app.get("/flexera/getAssetDetails",(req,res)=> {
    const device_id = req.query.deviceid;
    console.log(`devideId===> ${req.query.deviceid}`)
    apiCallFromRequest.callApi.callExternalApiUsingRequest(device_id, function(response){
        //console.log(JSON.stringify(response));
        const deviceID = "10092828";
       // req.body = deviceID;
        res.write(JSON.stringify(response));
        res.end();
    });
})


//route to get assets by stackid




app.get("/flexera/getAssetDetailsByStackId",(req,res)=> {
    const stack_id = req.query.stackid;
    console.log(`stackId===> ${req.query.stackid}`)
    apiCallFromRequest.callApi.getAssetDetailsApiByStackId(stack_id, function(response){
        res.write(JSON.stringify(response));
        res.end();
    });
})


// search assets 



app.get("/flexera/getAssetDetailBySerach",(req,res)=> {
    //const search_key = utils.insertSpacesBetweenWords(req.query.searchkey.replace(/\s/g, ""));
    const searchKey = req.query.searchkey.trim().replace(/\s/g,"%20");
    console.log(`search key===> ${searchKey}`)
    apiCallFromRequest.callApi.getAssetDetailBySerach(searchKey, function(response){
        res.write(JSON.stringify(response));
        res.end();
    });
})

// mouting all modular routes here
//app.use('/flexera', routes.flexera);