const db = require("../db/connection");

const fetchTopics = () => {
  const queryString = `SELECT * FROM topics;`;
  return db.query(queryString).then((res) => {
    return res.rows;
  });
};

const fetchArticles = () => {
  const queryString = `SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC`;
  return db.query(queryString).then((res) => {
    return res.rows;
  });
};

const fetchSingleArticle = (id) => {
  const queryString = `SELECT * FROM articles WHERE article_id = $1`;
  return db.query(queryString, [id]).then((res) => {
    if(res.rows.length < 1){
      return Promise.reject({
        status: 404,
        msg: "Article not found"
      });
    }
    return res.rows[0];
  })
};

const fetchComments = (id) => {
  const queryString = `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at ASC`;
  return db.query(queryString, [id]).then((res) => {
    if(res.rows.length === 0){
      return Promise.reject({
        status: 404,
        msg: "No comments found",
      });
    }
    return res.rows;
  });
};

module.exports = {
  fetchTopics,
  fetchArticles,
  fetchSingleArticle,
  fetchComments,
};
