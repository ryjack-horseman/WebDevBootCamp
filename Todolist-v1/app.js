const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    var today = new Date();
    //get day as "Monday, Tuesday, etc..."
    const options = { weekday: "long" };
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { kindOfDay: day });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
