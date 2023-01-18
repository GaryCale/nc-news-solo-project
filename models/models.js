const db = require("../db/connection");

const fetchTopics = () => {
  const queryString = `SELECT * FROM topics;`;
  return db.query(queryString).then((result) => {
    return result.rows;
  });
};

const fetchArticles = () => {
  const queryString = `SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC`;
  return db.query(queryString).then((result) => {
    return result.rows;
  });
};

const fetchSingleArticle = (id) => {
  const queryString = `SELECT * FROM articles WHERE article_id = ${id}`
  return db.query(queryString).then((result) => {
    return result.rows[0];
  })
}

module.exports = { fetchTopics, fetchArticles, fetchSingleArticle };
