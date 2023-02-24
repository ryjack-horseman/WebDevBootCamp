const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    var today = new Date();
    var currDay = today.getDay();
    var day = "";
    //get day as "Monday, Tuesday, etc..."
    const options = { weekday: "long" };
    day = new Intl.DateTimeFormat("en-US", options).format(today);
    
    res.render("list", { kindOfDay: day });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
