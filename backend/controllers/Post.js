const postRouter = require('express').Router()
const Post = require('../models/Post')

postRouter.get('/', async (request, response) => {
  const posts = await Post.find({}).populate('user', { username: 1, name: 1 })
  response.json(posts)
})

postRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const post = new Post({
    ...body,
    user: user._id
  })
  const newPost = await post.save()
  user.posts = user.posts.concat(newPost._id)
  await user.save()

  response.json(newPost)
})

postRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const user = request.user
  const post = await Post.findById(id)

  if(user._id.toString() === post.user.toString()) {
    await Post.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    response.status(401).json({
      error: 'Unauthorized operation'
    })
  }
})

postRouter.patch('/:id', async (request, response) => {
  const id = request.params.id
  const thePost = request.body
  const updatedPost = await Post.findByIdAndUpdate(id, thePost)
  response.json(updatedPost)
})

module.exports = postRouter