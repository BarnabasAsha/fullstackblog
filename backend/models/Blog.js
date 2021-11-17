const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post must have a title'],
    unique: [true, 'Post title must be unique'],
    minlength: [3, 'The name length should exceed or equal three']
  },
  author: {
    type: String,
    required: [true, 'Post must have an author'],
    minlength: [2, 'The name length should exceed or equal two']
  },
  url: {
    type: String,
    required: [true, 'Post must have an author']
  },
  likes: Number
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)