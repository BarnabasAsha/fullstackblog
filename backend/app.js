const express = require('express')
const logger = require('./utils/logger')
const config = require('./utils/config')
require('express-async-errors')
const middleware = require('./utils/middleware')
const postRouter = require('./controllers/Post')
const userRouter = require('./controllers/User')
const app = express()
const mongoose = require('mongoose')

logger.info('Connecting to', config.MONGO_URI)

mongoose.connect(config.MONGO_URI).then(result => {
  logger.info('Connected to mongo')
}).catch(error => logger.error('Error connecting to mongo:', error.message))


app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Welcome to bloglist 🙂</h1>')
})

app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app