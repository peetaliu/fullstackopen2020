const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0
  } else {
    const likes = blogs.map(b => b.likes)

    const sum = likes.reduce((acc, currV) => acc + currV, 0)

    return sum
  }
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return 0
  } else {
    const simplify = blogs.map(b => {
      const newB = {
        title: b.title,
        author: b.author,
        likes: b.likes,
      }
      return newB
    })

    const maxLikes = simplify.reduce(
      (prev, curr) => (prev.likes > curr.likes ? prev : curr),
      0
    )
    return maxLikes
  }
}

const mostBlogs = blogs => {
  const max = _.maxBy(
    _.map(_.countBy(blogs, 'author'), (val, key) => ({
      author: key,
      blogs: val,
    })),
    'blogs'
  )

  return max
}

const mostLikes = blogs => {
  const authBlog = blogs.map(b => {
    const authLikes = {
      author: b.author,
      likes: b.likes,
    }
    return authLikes
  })

  const mostAuthLikes = _.uniqBy(authBlog, 'author').map(a => {
    const authLikeArr = {
      author: a.author,
      likes: 0,
    }
    return authLikeArr
  })

  const getLikes = (authArr, authBlogArr) => {
    for (let i = 0; i < authArr.length; i++) {
      authBlogArr.forEach(blog => {
        if (blog.author === authArr[i].author) {
          authArr[i].likes = authArr[i].likes + blog.likes
        }
      })
    }
    const max = _.maxBy(authArr, 'likes')
    return max
  }

  console.log(authBlog)
  return getLikes(mostAuthLikes, authBlog)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
