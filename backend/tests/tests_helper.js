const User = require('../models/user')
const Post = require('../models/Post')

const PostsInDb = async () => {
  const posts = await Post.find({})
  return posts.map(u => u.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
//   initialNotes,
//   nonExistingId,
  PostsInDb,
  usersInDb
}