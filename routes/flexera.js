import { Router } from "express";
const apiCallFromRequest = require('./Request')
const apiCallFromNode = require('./NodeJsCall')

const router = Router();
//get flxera api
router.get("/showAssetDetails", (req, res) => {
    if(req.url === "/request"){
        res.send("this is sample data inside flexera api")
        apiCallFromRequest.callApi(function(response){
            //console.log(JSON.stringify(response));
            res.write(JSON.stringify(response));
            res.end();
        });
    }
    else if(req.url === "/node"){
        apiCallFromNode.callApi(function(response){
            res.write(response);
            res.end();
        });
    }
  });

  export default router;