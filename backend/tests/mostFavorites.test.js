const mostFavorites = require('../utils/list_helper').mostFavorites

const blogs = require('../blogData')


describe('most favorite', () => {
  test('most favorite with most likes', () => {
    expect(mostFavorites(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})