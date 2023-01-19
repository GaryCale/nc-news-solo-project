const express = require("express");
const {
  getTopics,
  getArticles,
  getSingleArticleById,
  getComments
} = require("./controllers/controllers");

const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getSingleArticleById);

app.get("/api/articles/:article_id/comments", getComments);

app.all("/*", (request, response, next) => {
  response.status(404).send({ msg: "End Point Not Found." });
});

app.use((error, request, response, next) => {
  if (error.code === "22P02") {
    response.status(400).send({ msg: "Bad Request" });
  } else {
    next(error);
  }
});

app.use((error, request, response, next) => {
  if(error.status && error.msg){
    response.status(error.status).send({msg: error.msg})
  } else {
    next(err)
  }
})

app.use((error, request, response, next) => {
  response.status(500).send({ msg: response.error });
});

module.exports = app;