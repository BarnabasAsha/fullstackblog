const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Post = require('../models/Post')

const initialPosts = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

beforeEach(async () => {
  await Post.deleteMany({})
  let postObject = new Post(initialPosts[0])
  await postObject.save()
  postObject = new Post(initialPosts[1])
  await postObject.save()
}, 100000)

test('posts are returned as json', async () => {
  await api.get('/api/posts')
    .expect(200)
    .expect('Content-type', /application\/json/)
}, 100000)

test('there are 2 posts', async () => {
  const response = await api.get('/api/posts')
  expect(response.body).toHaveLength(initialPosts.length)
}, 10000)

test('a valid post can be added', async () => {
  const newPost = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  await api
    .post('/api/posts')
    .send(newPost)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/posts')

  const contents = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialPosts.length + 1)
  expect(contents).toContain(
    'Canonical string reduction'
  )
}, 10000)

test('post without title is not added', async () => {
  const newPost = {
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  await api
    .post('/api/posts')
    .send(newPost)
    .expect(400)

  const response = await api.get('/api/posts')

  expect(response.body).toHaveLength(initialPosts.length)
}, 30000)

afterAll(() => {
  mongoose.connection.close()
})
