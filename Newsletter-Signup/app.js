const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { url } = require("inspector");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/91d68812c7";
    const options = {
        method: "POST",
        auth: "ryan1:d5e6a117629837b7d6839456d7ffb2bf-us1"

    }
    const request = https.request(url, options, function(response) {

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");        
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
  });
  
// mailchip api key
//   d5e6a117629837b7d6839456d7ffb2bf-us14

// List Id
// 91d68812c7