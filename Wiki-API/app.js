const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var ObjectID = require('mongodb').ObjectID;

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

app.route("/articles/:articleTitle")
.get(function(req, res){
    getArticle(req.params.articleTitle).then(article => {
        res.send(article);
    });
})
.put(function(req, res){
    updateArticle(req).then(x => {
        res.send("updated");
    });
})
.patch(function(req, res){
    patchArticle(req).then(x => {
        res.send("patched successfully");
    });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

async function getArticles() {
  return await Article.find();
}

async function getArticle(articleTitle){
    return await Article.findOne({title: articleTitle});
}

async function saveArticle(article) {
  return await article.save();
}

async function deleteArticles() {
  return await Article.deleteMany();
}

async function updateArticle(articleReq){
    return await Article.replaceOne(
        {title: articleReq.params.articleTitle},
        {title: articleReq.body.title, content: articleReq.body.content},
        );
}

async function patchArticle(articleReq){
    return await Article.updateOne(
        {title: articleReq.params.articleTitle},
        {$set: articleReq.body}
    )
}

//title
//content
