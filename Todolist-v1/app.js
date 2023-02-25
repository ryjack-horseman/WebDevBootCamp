const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const listItems = ["Something here"];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {

    const day = date.getDate();
    res.render("list", {listTitle: day, newListItems: listItems});
});

app.post("/", function(req, res){
    console.log(req.body.list);
    const listItem = String(req.body.newItem);
    if(req.body.list === "Work List"){
        workItems.push(listItem);
        res.redirect("/work");
    }else{
        listItems.push(listItem);
        res.redirect("/");
    }
    

});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
