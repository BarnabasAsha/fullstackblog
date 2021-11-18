const postRouter = require('express').Router()
const Post = require('../models/Post')

postRouter.get('/', async (request, response) => {
  const posts = await Post.find({})
  response.json(posts)
})

postRouter.post('/', async (request, response) => {
  const blog = new Post(request.body)
  const newPost = await blog.save()
  response.json(newPost)
})

postRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Post.findByIdAndRemove(id)
  response.status(204).end()
})

postRouter.patch('/:id', async (request, response) => {
  const id = request.params.id
  const thePost = request.body
  const updatedPost = await Post.findByIdAndUpdate(id, thePost)
  response.json(updatedPost)
})

module.exports = postRouter