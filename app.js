const express = require("express");
const { updateTopics } = require("./controllers/controllers");

const app = express();

// Looks for one of these resquests, invokes the  function
app.get("/api/topics", updateTopics)
app.use((error, request, repsonse, next) => {
  console.log(error);
  response.status(500).send({error: 'Internal server error'})
})

module.exports = app;
