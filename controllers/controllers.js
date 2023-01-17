// Handles response after request is made
const { fetchTopics, fetchArticles } = require("../models/models");

const updateTopics = (request, response, next) => {
  fetchTopics()
  .then((result) => {
    response.status(200).send({ topics: result });
  }).catch((err) => {
    next(err)
  })
};

const updateArticles = (request, response, next) => {
  const { article_id } = request.query
  console.log(article_id);
  fetchArticles()
    .then((result) => {
      const articles = result.map((article) => {
        return { ...article };
      });
      response.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

// For each article
// Add a property called comment_count
// The value of that property should be the number of articles which match that articles id

module.exports = { updateTopics, updateArticles };