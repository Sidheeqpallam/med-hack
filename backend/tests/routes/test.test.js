const supertest = require("supertest");
require('dotenv').config({ path: '.env.test' })

const { MSG } = require("../../helpers/constants")
const utility = require("../../helpers/utility")
const app = require("../../app");
const { token } = require('./login.test')
test("Checking the app is healthy", async () => {
  console.log(token, 'token')
  await supertest(app).get("/health-check")
    .expect(200)
    .then(async (response) => {
      expect(response.text).toBe('Healthy');
    });
});
