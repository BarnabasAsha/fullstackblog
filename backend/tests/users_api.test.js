const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/User.js')
const helper = require('./tests_helper')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = bcrypt.hash('secret', 10)
    const user = new User({ username: 'testUser', passwordHash })
    await user.save()
  })
})

test('creation succeeds with a fresh username', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

describe('when there is initially one user in db', () => {
  test('creation fails with proper statuscode and error message if username is taken', async () => {
    const usersAtStart = await helper.usersinDb()

    const newUser = {
      username: 'root',
      name: 'Suliyah',
      password: 'testpassword'
    }

    const result = await api.post('/user')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})