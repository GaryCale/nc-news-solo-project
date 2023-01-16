const app = require('../app');
const request = require("supertest");
const db = require("../db/connection");
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');


afterAll(() => {
  return db.end();
})

beforeEach(() => {
  return seed(testData)
})

describe("Endpoint: GET api/topics", () => {
  test("Returns an array of objects with correct properties", () => {
    return request(app).get("/api/topics").expect(200).then((response) => {

    })
  });
});
