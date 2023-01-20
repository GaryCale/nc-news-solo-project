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

const insertComment = (newComment, id) => {
  const { body, username } = newComment;
  return db
    .query(
      `INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) 
        RETURNING *;`,
      [body, username, id]
    )
    .then((result) => {
      if(newComment)
      return result.rows[0];
    });
};

const updateArticle = (reqObj, id) => {
  const { inc_votes } = reqObj
  const queryString = `
  UPDATE articles 
  SET votes = votes + $1 
  WHERE article_id = $2
  RETURNING *
  `;
  return db.query(queryString, [inc_votes, id]).then((result) => {
    if(result.rows.length === 0){
      return Promise.reject({
        status: 404,
        msg: "No article found",
      });
    }
    return result.rows[0];
  })
};

module.exports = {
  fetchTopics,
  fetchArticles,
  fetchSingleArticle,
  fetchComments,
  insertComment,
  updateArticle,
};
