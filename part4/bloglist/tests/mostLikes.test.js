const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('most likes', () => {
  const emptyList = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]
  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'boop',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676777d17f8',
      title: 'beep',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
      __v: 0,
    },
  ]
  test('of empty list is zero', () => {
    const result = favoriteBlog(emptyList)
    expect(result).toBe(0)
  })
  test('when list has only one blog', () => {
    const result = favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    })
  })
  test('of list with multiple(>1) blogs', () => {
    const result = favoriteBlog(listWithManyBlogs)
    expect(result).toEqual({
      title: listWithManyBlogs[1].title,
      author: listWithManyBlogs[1].author,
      likes: listWithManyBlogs[1].likes,
    })
  })
})
