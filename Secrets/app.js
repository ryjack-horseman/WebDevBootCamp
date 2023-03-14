//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});


const User = mongoose.model("User", userSchema);

app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });

    saveUser(newUser).then(x => {
        res.render("secrets");
    });
});

app.post('/login', function(req, res){
    const username = req.body.username;
    const password = md5(req.body.password);

    findUser(username).then(foundUser => {
        if(foundUser){
            if(foundUser.password === password){
                res.render("secrets");
            }
        }
    });    
});

app.listen(3000, function(){
    console.log("Server started at port 3000");
});

async function saveUser(user) {
    return await user.save();
  }

async function findUser(username) {
    return await User.findOne({email: username});
}