const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test Title 1',
    author: 'Test Author 1',
    url: 'test.url.1',
    likes: 10,
  },
  {
    title: 'Test Title 2',
    author: 'Test Author 2',
    url: 'test.url.2',
    likes: 4,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'will delete soon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
