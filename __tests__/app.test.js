const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");


beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("Endpoint: GET api/topics", () => {
  test("Returns a status code of 200 when query exists", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toHaveLength(3);
      });
  });
  test("Returns an array of objects with correct properties, and the correct length array", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        return res.body.topics;
      })
      .then((res) => {
        res.forEach((topic) => {
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
      .then((res) => {
        expect(res.body.articles).toHaveLength(12);
      });
  });
  test("Returns an array of objects with correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.articles.length).toBeGreaterThan(1);
        res.body.articles.forEach((article) => {
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
  test("The objects are sorted in descending order by their date property", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSortedBy("created_at", {
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
    .then((res) => {
      expect(res.body.msg).toBe("Article not found")
    })
  })
  test("Returns 400 when passed an invalid id", () => {
    return request(app)
    .get("/api/articles/abc")
    .expect(400)
    .then((res) => {
      expect(res.body.msg).toBe("Bad Request")
    })
  })
  test("Returns a single article object with an id which matches the parametric id, and article has the correct properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        expect(res.body.article).toMatchObject({
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
  test("Returns an array of objects with the correct ids and properties", () => {
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
      .then((res) => {
        expect(res.body.comments).toBeSortedBy("created_at", {
          ascending: true,
        });
      });
  });
  test("Returns 400 when passed an invalid id", () => {
    return request(app)
      .get("/api/articles/abc/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
});

describe("Endpoint: POST /api/articles/:article_id/comments", () => {
  test("Returns a status code of 200 when correct post request is made", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "butter_bridge",
            body: "string"
      })
      .expect(201)
  });
  test("Returns an object with correct properties and values", () => {
    return request(app)
    .post("/api/articles/1/comments")
    .expect(201)
    .send({
      username: "butter_bridge",
      body: "string",
    })
    .then((res) => {
      expect(res.body.article).toMatchObject({
        comment_id: expect.any(Number),
        body: expect.any(String),
        article_id: expect.any(Number),
        author: expect.any(String),
        votes: expect.any(Number),
        created_at: expect.any(String),
      });
    })
  });
  test("Returns 400 when passed an invalid id", () => {
    return request(app)
      .post("/api/articles/abc/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
});

describe("Endpoint: PATCH /api/articles/:article_id", () => {
  test("Returns a status code of 200 when valid patch request is made", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 10 })
      .expect(200)
  });
  test("Returns the correct object with its votes property increased or decreased by the correct value", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 10 })
      .expect(200)
      .then((res) => {
        expect(res.body.article).toMatchObject({
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
  })
  test("Returns unaltered data when user sends no data", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 0 })
      .expect(200)
      .then((res) => {
        expect(res.body.article.votes).toBe(100)
      })
  });
  test("Returns 400 status when user sends wrong data", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "string" })
      .expect(400)
  })
});

describe("404 Error", () => {
test("Returns a status code of 404 when passed a endpoint that does not exist", () => {
    return request(app)
      .get("/api/invalid_endpoint")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("End Point Not Found.");
      });
  });
});







