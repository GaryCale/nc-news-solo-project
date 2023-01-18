const express = require("express");
const {
  getTopics,
  getArticles
} = require("./controllers/controllers");

const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.all("/*", (request, response, next) => {
  response.status(404).send({ msg: "End Point Not Found." });
});

app.use((error, request, response, next) => {
  response.status(500).send({ msg: response.error });
});

module.exports = app;
