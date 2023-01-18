const {
  fetchTopics,
  fetchArticles,
  fetchSingleArticle,
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
      response.status(200).send({ articles: articles });
    })
    .catch((err) => {
      next(err);
    });
};

const getSingleArticleById = (request, response, next) => {
  const { article_id } = request.params;
  fetchSingleArticle(article_id)
    .then((article) => {
      response.status(200).send( { article: article } );
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getTopics, getArticles, getSingleArticleById };
