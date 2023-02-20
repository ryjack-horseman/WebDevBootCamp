const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;
    res.send("The result of that calculation is: " + result);
});

app.get("/bmicalculator", function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res){

    var height = parseFloat(req.body.height);
    var weight = parseFloat(req.body.weight);

    var result = bmiCalculator(weight, height);
    
    res.send("Your BMI is: " + result);
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

function bmiCalculator(weight, height) {
    return weight / (height * height);
}