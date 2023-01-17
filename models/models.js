// Data handler.
// Passes data back to the controller
const db = require("../db/connection");

const fetchTopics = () => {
  const queryString = `SELECT * FROM topics;`
  return db.query(queryString).then((result) => {
    return result.rows;
  })
};

const fetchArticles = () => {
  const queryString = `SELECT * FROM articles;`;
  return db.query(queryString).then((result) => {
    return result.rows;
  });
}

module.exports = { fetchTopics, fetchArticles };
