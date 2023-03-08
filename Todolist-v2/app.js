//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your TodoList!",
});

const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "<-- Hi this  to delete an item.",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  getItems().then((list) => {
    if (list.length === 0) {
      Item.insertMany(defaultItems)
        .then(function (items) {
          console.log("Success saved default items to db");
          res.redirect("/");
        })
        .catch(function (err) {
          console.log(err);
        });
    }else{
      res.render("list", { listTitle: "Today", newListItems: list });
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  });
  item.save();
  res.redirect("/");
});


app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  console.log(checkedItemId);
  Item.findByIdAndRemove(checkedItemId).then(x => {
    res.redirect("/");
  });
});

app.get("/:customListName", function(req, res){
  const customListName = req.params.customListName;
  getList(customListName).then((list) => {

    if(!list){
      //list doesn't exist
      const list = new List({
        name: customListName,
        items: defaultItems 
      });
      list.save();
      res.redirect("/"+customListName);
    }else{
      //show and existing list
      res.render("list", {listTitle: list.name, newListItems: list.items});
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

async function getItems() {
  //const items = await Item.find();
  return await Item.find();
}

async function getList(customListName) {
  //const items = await Item.find();
  return await List.findOne({name: customListName});
}
