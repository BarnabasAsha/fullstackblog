const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.get('/', async (request, response) => {
  const data = await User.find({})
  response.json(data)
})

userRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    name: body.name,
    username: body.username,
    passwordHash
  })

  const newUser = await user.save()
  response.json(newUser)
})

module.exports = userRouter