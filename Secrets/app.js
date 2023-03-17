//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

//serialize user
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

//deserialize user
passport.deserializeUser(function(id, done) {

        User.findById(id).then(user=>{
            done(null, user);
        })
        .catch((err)=>{ return done(err); });

  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/secrets',
    scope: [ 'profile' ],
    state: true
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
        console.log(profile);
        // Find or create user in your database
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // Create new user in database
          const username = Array.isArray(profile.emails) && profile.emails.length > 0 ? profile.emails[0].value.split('@')[0] : '';
          const newUser = new User({
            username: profile.displayName,
            googleId: profile.id
          });
          user = await newUser.save();
        }
        return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


app.get("/", function(req, res){
    res.render("home");
});

app.get("/auth/google", passport.authenticate('google'));

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/secrets');
  });

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/secrets", function(req, res){
    findUserWithSecret().then(foundUsers => {
        if(foundUsers){
            res.render("secrets", {usersWithSecrets: foundUsers});
        }
    });
});

app.get("/logout", function(req, res){
    req.logout(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    });

});

app.get("/submit", function(req, res){
    if(req.isAuthenticated()){
        res.render("submit")
    }else{
        res.redirect("/login");
    }
});

app.post("/submit", function(req, res){
    const submittedSecret = req.body.secret;
    console.log("here");
    findUserById(req.user.id).then(foundUser => {
        if(foundUser){
            foundUser.secret = submittedSecret;
            saveUser(foundUser).then(x =>{
                res.redirect("/secrets");
            });
        }
    });
});

app.post("/register", function(req, res){
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });
        }
    });
});

app.post('/login', function(req, res){
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        
        req.login(user, function(err){
            if(err){
                console.log(err);
            }else{
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/secrets");
                });
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

async function findUserById(id){
    return await User.findById(id);
}

async function findUserWithSecret(){
    return User.find({"secret": {$ne: null}});
}