// Handles response after request is made
const { fetchTopics } = require("../models/models");

const updateTopics = (request, response, next) => {
  fetchTopics().then((result) => {
    response.status(200).send({ topics: result });
  }).catch((err) => {
    next(err)
  })
};

module.exports = { updateTopics };