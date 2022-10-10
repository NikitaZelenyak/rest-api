const signup = require("./signup");
const express = require("express");
const request = require("supertest");
const app = express();
app.post("/api/users/signup", signup);

describe("test signup", () => {
  beforeAll(() => app.listen(3000));
  test("test login", async () => {
    const response = await request(app).post("/api/users/signup").send({
      email: "zeleniak@gmail.com",
      password: "123456",
    });
    console.log(response);
    expect(response.status).toBe(201);
  });
});

// Получаю вот такую ошибку не пойму что как ее решить(ошибка вылазить при старте скрипта)
///thrown: "Exceeded timeout of 5000 ms for a test.
// Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."
//

// ТЗ по скриптам странная просят проверить signup с кодом 200 но нужно ж получить 201 при создание юсера
// так же мы не создаем токен при создании юзера
// скорее всего речь идет о контроллере login
