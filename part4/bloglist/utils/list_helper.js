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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
