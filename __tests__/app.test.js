const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("Endpoint: GET api/topics", () => {
  test("Returns a status code of 200 when query exists", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((result) => {
        expect(result.body.topics).toHaveLength(3);
      });
  });
  test("Returns an array of objects with correct properties, and the correct length array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        return response.body.topics;
      })
      .then((response) => {
        response.forEach((topic) => {
          expect(topic.hasOwnProperty("slug")).toBe(true);
          expect(topic.hasOwnProperty("description")).toBe(true);
        });
      });
  });
});

describe("Endpoint: GET /api/articles", () => {
  test("Returns a status code of 200 when query exists, and the correct length array", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then((result) => {
      expect(result.body.articles).toHaveLength(12);
    });
  });
  test("Returns an array of objects with correct properties", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then((response) => {
      response.body.articles.forEach((article) => {
        expect(article).toMatchObject({
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
          comment_count: expect.any(String),
          article_id: expect.any(Number)
        })
      });
    });
  });
  test("The article objects are sorted in descending order by their date property", () => {
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then((response) => {
      expect(response.body.articles).toBeSortedBy("created_at", {descending: true})
    });
  });
});

describe("Endpoint: GET api/articles/:article_id", () => {
  test("Returns a status code of 200 when query exists", () => {
    return request(app)
    .get("/api/articles/1")
    .expect(200)
  });
  
  test("Returns a single article object with an id which matches the parametric id, and article has the correct properties", () => {
    return request(app)
    .get("/api/articles/1")
    .expect(200)
    .then((result) => {
      console.log(result.body.article);
      expect(result.body.article).toMatchObject({
        article_id: expect.any(Number),
        title: expect.any(String),
        topic: expect.any(String),
        author: expect.any(String),
        body: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        article_img_url: expect.any(String),
      });
    }
    )
  })
});

describe("404 Error", () => {
test("Returns a status code of 404 when passed a endpoint that does not exist", () => {
    return request(app)
      .get("/api/")
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe("End Point Not Found.");
      });
  });
});
