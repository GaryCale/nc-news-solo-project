const express = require("express");
const {
  getTopics,
  getArticles,
  getSingleArticleById,
  getComments,
  postArticle,
  patchArticle
} = require("./controllers/controllers");

const app = express();

app.use(express.json())

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getSingleArticleById);

app.get("/api/articles/:article_id/comments", getComments);

app.post("/api/articles/:article_id/comments", postArticle);

app.patch("/api/articles/:article_id", patchArticle);

app.all("/*", (request, response, next) => {
  response.status(404).send({ msg: "End Point Not Found." });
});

app.use((err, req, res, next) => {
  if(err.status && err.msg){
    res.status(err.status).send({msg: err.msg})
  } else {
    next(err)
  }
})

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err)
  }
})

app.use((error, request, response, next) => {
  response.status(500).send({ msg: response.error });
});

module.exports = app;