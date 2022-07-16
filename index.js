const { json } = require("body-parser");
const bodyParser = require("body-parser");
const express=require("express");
const app=express();
const https=require("https");
const path = require("path");

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const f_name=req.body.fname;
    const l_name=req.body.lname;
    const email_id=req.body.email;

    let data={
        members:[
            {
                email_address:email_id,
                status:"subscribed",
                merge_fields:{
                    FNAME:f_name,
                    LNAME:l_name
                }
            }
        ]
    };
    let jsondata=JSON.stringify(data);

    const Api_key="cfd2c6015d4c48c4c07f6e20c083c149-us13";
    const url="https://us13.api.mailchimp.com/3.0/lists/d98c7ca287";

    const options={
        method:"POST",
        auth:"akash1:cfd2c6015d4c48c4c07f6e20c083c149-us13"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/sucess.html");
        }
        else
            res.sendFile(__dirname+"failure.html");

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsondata);
    request.end();
});

//Api key=cfd2c6015d4c48c4c07f6e20c083c149-us13
//id=d98c7ca287

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is up and running");
})