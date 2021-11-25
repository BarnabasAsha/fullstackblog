const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

router.post('/reset', async (request, response) => {
  await Post.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router