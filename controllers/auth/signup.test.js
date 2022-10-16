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
