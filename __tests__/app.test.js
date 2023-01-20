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
      .then((result) => {
        return result.body.topics;
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
      .then((result) => {
        expect(result.body.articles.length).toBeGreaterThan(1);
        result.body.articles.forEach((article) => {
          expect(article).toMatchObject({
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
            article_id: expect.any(Number),
          });
        });
      });
  });
  test("The articleS are sorted in descending order by their date property", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((result) => {
        expect(result.body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});

describe("Endpoint: GET /api/articles/:article_id", () => {
  test("Returns a status code of 200 when query exists", () => {
    return request(app).get("/api/articles/1").expect(200);
  });
  test("Returns 404 when passed a valid id but it does not exist", () => {
    return request(app)
    .get("/api/articles/999")
    .expect(404)
    .then((result) => {
      expect(result.body.msg).toBe("Article not found")
    })
  })
  test("Returns 400 when passed an invalid id", () => {
    return request(app)
    .get("/api/articles/abc")
    .expect(400)
    .then((result) => {
      expect(result.body.msg).toBe("Bad Request")
    })
  })
  test("Returns a single article object with an id which matches the parametric id, and article has the correct properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((result) => {
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
      });
  });
});

describe("Endpoint: GET /api/articles/:article_id/comments", () => {
  test("Returns a status code of 200 when query exists", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
  });
  test("Returns an array of objects with the correct ids and properties, and returns correct error when returning an empty array", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((result) => {
        expect(result.body.comments.length).toBeGreaterThan(1)
        result.body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number)
          });
        });
      });
  });
  test("The comments are sorted in ascending order by their created_at property", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((result) => {
        expect(result.body.comments).toBeSortedBy("created_at", {
          ascending: true,
        });
      });
  });
  test("Returns 400 when passed an invalid id", () => {
    return request(app)
      .get("/api/articles/abc/comments")
      .expect(400)
      .then((result) => {
        expect(result.body.msg).toBe("Bad Request");
      });
  });
});

describe("404 Error", () => {
test("Returns a status code of 404 when passed a endpoint that does not exist", () => {
    return request(app)
      .get("/api/invalid_endpoint")
      .expect(404)
      .then((result) => {
        expect(result.body.msg).toBe("End Point Not Found.");
      });
  });
});




