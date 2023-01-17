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

  test("Returns an array of objects with correct properties", () => {
    return request(app).get("/api/topics").expect(200).then((response) => {
      return response.body.topics;
    }).then((response) => {
        response.forEach((topic) => {
          expect(topic.hasOwnProperty("slug")).toBe(true);
          expect(topic.hasOwnProperty("description")).toBe(true);
        })
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
// {
//           article_id: 1,
//           title: 'Living in the shadow of a great man',
//           topic: 'mitch',
//           author: 'butter_bridge',
//           body: 'I find this existence challenging',
//           created_at: '2020-07-09T20:11:00.000Z',
//           votes: 100,
//           article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.

// describe("Endpoint: GET /api/articles", () => {
//   test("Returns an array of objects with correct properties", () => {
//     return request(app)
//       .get("/api/articles")
//       .expect(200)
//       .then((response) => {
//         response.body.forEach((article) => {
//           expect(article.hasOwnProperty("article_id")).toBe(true);
//           expect(article.hasOwnProperty("title")).toBe(true);
//           expect(article.hasOwnProperty("article_id")).toBe(true);
//           expect(article.hasOwnProperty("article_id")).toBe(true);
//           expect(article.hasOwnProperty("article_id")).toBe(true);
//           expect(article.hasOwnProperty("article_id")).toBe(true);
//         })
//       });
//   });
// });
