const functions = require('firebase-functions');
const admin = require("firebase-admin");
const firebase = require("firebase");
admin.initializeApp(functions.config().firebase);
const defaultStorage = admin.storage();
var database = admin.firestore();

const axios = require('axios');

exports.ConvertImageToText = functions.storage.object().onFinalize( (object) =>{
    console.log(JSON.stringify(object))
    let folder = object.name.split("/")[0] + "/" + object.name.split("/")[1];
    const bucket = defaultStorage.bucket();
    const file = bucket.file(object.name);
    const options = {
        action: 'read',
        expires: '03-17-2025'
      };
    
    let imageUrl;

    file.getSignedUrl(options)
        .then(results => {
            imageUrl = results[0];
            console.log(results[0]);
        
    console.log(imageUrl);
    var config = {
        method: "POST",
        url: "https://imageprocessinghtn-2019.cognitiveservices.azure.com/vision/v2.0/read/core/asyncBatchAnalyze",
        headers: {
            "Ocp-Apim-Subscription-Key": "f757146a1fed421d97bf85b0c9c5cbb6"
        },
        data: {
            "url": imageUrl
        }
    }

   return  axios(config)
    .then((res)=> {
            console.log(res);
            var url = String(res.headers["operation-location"])
            console.log(url)
            var pollAxios = function(){
                return axios.get(url, 
                {
                    "headers": {
                        "Ocp-Apim-Subscription-Key": "f757146a1fed421d97bf85b0c9c5cbb6",
                        "Content-Type":"application/json"
                    } 
                })
                .then((res2)=>{
                    console.log(res2);
                    let analysis = res2;

                    // let ifHasOwnProperty = analysis["data"].hasOwnProperty("recognitionResults")
                    // let ifHasStatus = analysis["data"].hasOwnProperty("status")

                    // setInterval(()=> {
                        let ifHasOwnProperty = analysis["data"].hasOwnProperty("recognitionResults")
                        let ifHasStatus = analysis["data"].hasOwnProperty("status")
                        console.log (ifHasOwnProperty + " " + ifHasStatus);
                        if (ifHasOwnProperty) {
                            console.log(JSON.stringify(analysis["data"]["recognitionResults"]) + "!");
                            let recognitionResults = analysis.data.recognitionResults[0]["lines"]
                            let depth1 =  recognitionResults.map(line => line.text)
                            console.log(depth1)
                            let maxVal = 0.0;
                            for (var index in depth1){
                                console.log(depth1[index]);
                                if(depth1[index].includes("$")){
                                    let val = parseFloat(depth1[index].replace("$", ""));
                                    if (val > maxVal)
                                        maxVal = val;
                                }
                            }
                            console.log(maxVal);
                            console.log(folder.split("/")[0] + "   /   " + folder.split("/")[1]);
                            var ref = database.collection(folder.split("/")[0]).doc(folder.split("/")[1]);

                            const increment = admin.firestore.FieldValue.increment(maxVal);
                            ref.update("currentExpenditure", admin.firestore.FieldValue.increment(maxVal));
                            return;
                        }
                    return
                    
                })
            }
            return setTimeout(()=>pollAxios(), 10000);

            
        })  
        .catch(err=>console.log(err))
        console.log("DONE");})
        
    })