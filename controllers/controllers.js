// Handles response after request is made
const { fetchTopics, fetchArticles } = require("../models/models");

const updateTopics = (request, response, next) => {
  fetchTopics().then((result) => {
    response.status(200).send({ topics: result });
  }).catch((err) => {
    next(err)
  })
};

const getArticles = (request, response, next) => {
  fetchArticles()
    .then((result) => {
      const articles = result.map((article) => {
        return {...article}
      })
      response.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { updateTopics, getArticles };