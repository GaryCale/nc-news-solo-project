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
  const queryString = `SELECT * FROM articles WHERE articles.article_id = $1`;
  return db.query(queryString, [id]).then((result) => {
    if(result.rows.length < 1){
      return Promise.reject({
        status: 404,
        msg: "Article not found"
      });
    }
    return result.rows[0];
  })
};

const fetchComments = (id) => {
  const queryString = `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at ASC`;
  return db.query(queryString, [id]).then((result) => {
    if (result.rows.length < 1) {
      return Promise.reject({
        status: 404,
        msg: "Comments not found",
      });
    }
    return result.rows;
  });
};

const insertComment = (newComment, id) => {
  const { body, username } = newComment;
  console.log(body, username, id);
  return db
    .query(
      `INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) 
        RETURNING *;`,
      [body, username, id]
    )
    .then((result) => {
      if (result.rows.length < 1) {
        return Promise.reject({
          status: 404,
          msg: "Comments not found",
        });
      }
      return result.rows[0];
    });
};

module.exports = {
  fetchTopics,
  fetchArticles,
  fetchSingleArticle,
  fetchComments,
  insertComment
};
