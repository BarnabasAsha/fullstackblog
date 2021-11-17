const dummy = (blogs) => {
  return Array.isArray(blogs) ? 1 : null
}

const totalLikes = (blogs) => {
  const calLikes = (val, item) => val + item.likes

  return blogs.length ? blogs.reduce(calLikes, 0) : 0
}

const mostFavorites = (blogs) => {
  const calFav = (val, item) => {
    return Math.max(val, item.likes)
  }

  const highest = blogs.reduce(calFav, 0)
  const filtered = blogs.filter(blog => blog.likes === highest)

  return blogs.length ? { 'author': filtered[0].author,
    'likes': filtered[0].likes,
    'title': filtered[0].title } : 0
}

module.exports = {
  dummy,
  totalLikes,
  mostFavorites
}