const db = require("../db/connection");

const fetchTopics = () => {
  const queryString = `SELECT * FROM topics;`;
  return db.query(queryString).then((result) => {
    return result.rows;
  });
};

// Join tables, aggregate function: count()
// Count comments attached to each 
// As = comment_count
const fetchArticles = () => {
  const queryString = `SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id`;
  return db.query(queryString).then((result) => {
    console.log(result.rows);
    return result.rows;
  });
};

module.exports = { fetchTopics, fetchArticles };
