const {
  fetchTopics,
  fetchArticles
} = require("../models/models");

const getTopics = (request, response, next) => {
  fetchTopics()
    .then((result) => {
      response.status(200).send({ topics: result });
    })
    .catch((err) => {
      next(err);
    });
};

const getArticles = (request, response, next) => {
  fetchArticles()
    .then((articles) => {
      response.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getTopics, getArticles };
