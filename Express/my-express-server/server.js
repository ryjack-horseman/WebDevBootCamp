const express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("<h1>Hello</h1>");
});

app.get("/contact", function(req, res) {
    res.send("Contact me at: ryan@gmail.com");
});

app.get("/about", function(req, res) {
    res.send("We love Ann Arbor food");
});

app.get("/hobbies", function(req, res) {
    res.send("Soccer Soccer Soccer");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});