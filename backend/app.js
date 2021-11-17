const express = require('express')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/Blog')
const app = express()
const mongoose = require('mongoose')

logger.info('Connecting to mongo')

mongoose.connect(config.MONGO_URI).then(result => {
  logger.info('Connected to mongo')
}).catch(error => logger.error('Error connecting to mongo:', error.message))


app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Welcome to bloglist 🙂</h1>')
})

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.unknownEndpoint)

module.exports = app