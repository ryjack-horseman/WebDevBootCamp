const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

app
  .route("/articles")
  .get(function (req, res) {
    getArticles().then((foundArticles) => {
      res.send(foundArticles);
    });
  })
  .post(function (req, res) {
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    saveArticle(article).then((x) => {
      res.send("Successfully added a new article");
    });
  })
  .delete(function (req, res) {
    deleteArticles().then((x) => {
      res.send("Successfully deleted all articles");
    });
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

async function getArticles() {
  return await Article.find();
}

async function saveArticle(article) {
  return await article.save();
}

async function deleteArticles() {
  return await Article.deleteMany();
}

//title
//content
