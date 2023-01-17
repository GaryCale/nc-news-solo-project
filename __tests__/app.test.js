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
  
  test('Returns a status code of 200 when query exists', () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then((result) => {
      expect(result.body.topics).toHaveLength(3)
    })
  })

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

describe('404 Error', () => {
  test('Returns a status code of 404 when passed a endpoint that does not exist', () => {
    return request(app)
    .get('/api/')
    .expect(404)
    .then((result) => {
      expect(result.body.msg).toBe("End Point Not Found.")
    })
  })
})

describe("Endpoint: GET /api/articles", () => {

  test("Returns a status code of 200 when query exists, and the correct length array", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((result) => {
        expect(result.body).toHaveLength(12);
        console.log(result.body)
      });
  });

  test("Returns an array of objects with correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        response.body.forEach((article) => {
          expect(article.hasOwnProperty("article_id")).toBe(true);
          expect(article.hasOwnProperty("title")).toBe(true);
          expect(article.hasOwnProperty("topic")).toBe(true);
          expect(article.hasOwnProperty("author")).toBe(true);
          expect(article.hasOwnProperty("body")).toBe(true);
          expect(article.hasOwnProperty("created_at")).toBe(true);
          expect(article.hasOwnProperty("votes")).toBe(true);
          expect(article.hasOwnProperty("article_img_url")).toBe(true);
        })
      });
  });

  test("Each article object has a property called comment_count which has the correct value for the ids of that type", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        response.body.forEach((article) => {
          
        });
      });
  });

  test("The article objects are sorted in descending order by their date property", () => {

  });
});
