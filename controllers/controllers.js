const {
  fetchTopics,
  fetchArticles,
  fetchSingleArticle,
  fetchComments,
  insertComment
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

const getComments = (request, response, next) => {
  const { article_id } = request.params;
  fetchComments(article_id)
  .then((comments) => {
    response.status(200).send({ comments: comments });
  })
  .catch((err) => {
    next(err)
  })
};

const postArticle = (req, res, next) => {
  console.log(req.body)
  const { article_id } = req.params;
  console.log(article_id)
  insertComment(req.body, article_id)
  .then((newArticle) => {
    res.status(201).send({ article: newArticle });
  })
  .catch((err) => {
    next(err)
  })
};

module.exports = {
  getTopics,
  getArticles,
  getSingleArticleById,
  getComments,
  postArticle,
};
