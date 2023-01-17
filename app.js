const express = require("express");
const { updateTopics, getArticles } = require("./controllers/controllers");

const app = express();

app.get("/api/topics", updateTopics);

app.get("/api/articles", getArticles);

// This is only works with 404 - endpoint not found
app.use('*', ( request, response, next ) => {
  response.status(404).send({ msg: "End Point Not Found." });
});

app.use((error, request, response, next) => {
  response.status(500).send({ msg: response.error });
});

module.exports = app;
