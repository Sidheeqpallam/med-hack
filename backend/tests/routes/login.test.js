const supertest = require("supertest");
require('dotenv').config({ path: '.env.test' })

const { MSG } = require("../../helpers/constants")
const utility = require("../../helpers/utility")
const app = require("../../app");

test("Checking the app is healthy", async () => {

  await supertest(app).get("/health-check")
    .expect(200)
    .then(async (response) => {
      expect(response.text).toBe('Healthy');
    });
});

let token

// AUTHENTICATION APIS
let userId = null
const userData = {
  userName: 'sidheeq',
  userEmail: 'sidheeq',
  userMobileNo: (Math.floor(Math.random() * 9000000000) + 1000000000) + '',
  userPassword: 'sidheeq'
};

const invalidUserData = {
  userName: 'sidheeq',
  userEmail: 'sidheeq',
  userMobileNo: '80788580', // Invalid mobile no.
  userPassword: 'sidheeq'
}

beforeAll(async () => {

})

test("User register", async () => {


  await supertest(app).post("/api/v1/users/auth/register")
    .send(userData)
    .expect(200)
    .then(async (response) => {
      const { message, status, data } = response.body
      expect(message).toBe(MSG.registeredSuccessfully)
      expect(status).toBe('success')
      token = data.token
      userId = data.user._id
      expect(data.user.userName).toBe(utility.capitalizeString(userData.userName))
      expect(data.user.userMobileNo).toBe(userData.userMobileNo)
    });

  await supertest(app).post("/api/v1/users/auth/register")
    .send(userData)
    .expect(400)
    .then(async (response) => {
      expect(response.body.message).toEqual(utility.errorRes(MSG.userExist));
    });

  await supertest(app).post("/api/v1/users/auth/register")
    .send(invalidUserData)
    .expect(400)
    .then(async (response) => {
      expect(response.body.message).toEqual(utility.errorRes(MSG.missingRequiredData));
    });

});

test("User login", async () => {

  await supertest(app).post("/api/v1/users/auth/login")
    .send(userData)
    .expect(200)
    .then(async (response) => {
      const { message, status, data } = response.body
      expect(message).toBe(MSG.loginSuccessfully)
      expect(status).toBe('success')
      token = data.token
      expect(data.user._id).toBe(userId)
      expect(data.user.userName).toBe(utility.capitalizeString(userData.userName))
      expect(data.user.userMobileNo).toBe(userData.userMobileNo)
    });

  await supertest(app).post("/api/v1/users/auth/login")
    .send({ 'userMobileNo': '2332', 'userPassword': '' })
    .expect(400)
    .then(async (response) => {
      expect(response.body.message).toEqual(utility.errorRes(MSG.missingRequiredData));
    });

  await supertest(app).post("/api/v1/users/auth/login")
    .send({ ...userData, 'userPassword': 'invlid passowrd' })
    .expect(400)
    .then(async (response) => {
      expect(response.body.message).toEqual(utility.errorRes(MSG.invalidCredentials));
    });

});

// BOOKS APIS
let bookId = null
const bookData = {
  bookTitle: 'My book 3',
  bookAuthor: 'sidheeq',
  bookDescription: 'My book discription',
  bookPublishedYear: 2000,
}

const invalidBookData = {
  bookTitle: 'My book',
  bookAuthor: 'sidheeq',
  bookDescription: 'My book discription',
  bookPublishedYear: 20030, // invalid year
}

test('Create book', async () => {

  await supertest(app).post("/api/v1/books")
    .set('Authorization', `Bearer ${token}`)
    .send(bookData)
    .expect(200)
    .then(async (response) => {
      const { message, status, data } = response.body
      expect(message).toBe(MSG.dataCreated)
      expect(status).toBe('success')
      bookId = data.book._id
      expect(data.book.bookTitle).toBe(utility.capitalizeString(bookData.bookTitle))
      expect(data.book.bookAuthor).toBe(utility.capitalizeString(bookData.bookAuthor))
      expect(data.book.bookPublishedYear).toBe(bookData.bookPublishedYear)
    });

  await supertest(app).post("/api/v1/books")
    .set('Authorization', `Bearer ${token}`)
    .send(bookData)
    .expect(400)
    .then(async (response) => {
      expect(response.body.message).toEqual(utility.errorRes(MSG.alreadyExists));
    });

  await supertest(app).post("/api/v1/books")
    .set('Authorization', `Bearer invalid token`)
    .send(bookData)
    .expect(401)
    .then(async (response) => {
      expect(response.body).toEqual(utility.errorRes(MSG.notAuthorized));
    });

  await supertest(app).post("/api/v1/books")
    .set('Authorization', `Bearer ${token}`)
    .send(invalidBookData)
    .expect(400)
    .then(async (response) => {
      expect(response.body.message).toEqual(utility.errorRes(MSG.missingRequiredData));
    })

})

test('Get a particular book', async () => {

  await supertest(app).get(`/api/v1/books/${bookId}`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200)
    .then(async (response) => {
      const { message, status, data } = response.body
      expect(message).toBe(MSG.foundSuccessfully)
      expect(status).toBe('success')
      expect(data.book.bookTitle).toBe(utility.capitalizeString(bookData.bookTitle))
      expect(data.book._id).toBe(bookId)
      expect(data.book.bookAuthor).toBe(utility.capitalizeString(bookData.bookAuthor))
      expect(data.book.bookPublishedYear).toBe(bookData.bookPublishedYear)
    });

})


test('Update a book', async () => {

  const newData = { ...bookData, bookAuthor: 'sidheeq pallam' }
  await supertest(app).put(`/api/v1/books/${bookId}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ ...bookData, bookAuthor: 'sidheeq pallam' })
    .expect(200)
    .then(async (response) => {
      const { message, status, data } = response.body
      expect(message).toBe(MSG.updatedSuccessfully)
      expect(status).toBe('success')
      expect(data.book._id).toBe(bookId)
      expect(data.book.bookTitle).toBe(utility.capitalizeString(bookData.bookTitle))
      expect(data.book.bookAuthor).toBe(utility.capitalizeString(newData.bookAuthor))
      expect(data.book.bookPublishedYear).toBe(bookData.bookPublishedYear)
    });

  await supertest(app).put(`/api/v1/books/${bookId}`)
    .set('Authorization', `Bearer invalid token`)
    .send(bookData)
    .expect(401)
    .then(async (response) => {
      expect(response.body).toEqual(utility.errorRes(MSG.notAuthorized));
    });

  await supertest(app).put(`/api/v1/books/${bookId}`)
    .set('Authorization', `Bearer ${token}`)
    .send(invalidBookData)
    .expect(400)
    .then(async (response) => {
      expect(response.body.message).toEqual(utility.errorRes(MSG.missingRequiredData));
    })

})

test('Get all books', async () => {

  await supertest(app).get("/api/v1/books")
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200)
    .then(async (response) => {
      const { message, status } = response.body
      expect(status).toBe('success')
      expect(message).toMatch(new RegExp(`${MSG.dataNotFound}|${MSG.foundSuccessfully}`))
    });

})

test('Delete book', async () => {

  await supertest(app).delete(`/api/v1/books/${bookId}`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200)
    .then(async (response) => {
      expect(response.body).toEqual(utility.successRes(MSG.deletedSuccessfully, []));
    })

})

test('Delete user account', async () => {

  await supertest(app).delete(`/api/v1/users/auth/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200)
    .then(async (response) => {
      expect(response.body).toEqual(utility.successRes(MSG.deletedSuccessfully, []));
    })

})

module.exports = { token }