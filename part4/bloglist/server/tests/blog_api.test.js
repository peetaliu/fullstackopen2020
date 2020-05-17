const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const api = supertest(app)

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(b => new Blog(b))
  const promiseArr = blogObjects.map(b => b.save())
  await Promise.all(promiseArr)

  await User.deleteMany({})

  const newUser = {
    username: 'peetaliu',
    name: 'Peter Liu',
    password: 'password',
  }

  await api.post('/api/users').send(newUser)

  const logged = await api
    .post('/api/login')
    .send({ username: newUser.username, password: newUser.password })

  token = `bearer ${logged.body.token}`
})

test('all blogs returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs returned', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('_id property returned as id', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[0].id).toBeDefined()
})

describe('when no user is logged in', () => {
  test('Creating blog fails with proper status code', async () => {
    const newBlogPost = {
      title: 'toFail',
      author: 'toFail',
      url: 'toFail',
      likes: 1,
    }
    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('when user is logged in', () => {
  test('blog post can be added to db', async () => {
    console.log(token)
    const newBlogPost = {
      title: 'post blog title test',
      author: 'post blog author test',
      url: 'post.test.url.1',
      likes: 69,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlogPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const savedTitle = blogsAtEnd.map(b => b.title)
    expect(savedTitle).toContain(newBlogPost.title)
  })

  test('blog with no like property defaults to 0', async () => {
    const newBlogPost = {
      title: 'post blog title test',
      author: 'post blog author test',
      url: 'post.test.url.1',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlogPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('missing title and url returns 400', async () => {
    const newBlogPost = {
      author: 'post blog author test',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlogPost)
      .expect(400)
  })

  test('delete successful', async () => {
    const newBlogPost = {
      title: 'tobedeleted',
      author: 'tobedeleted',
      url: 'tobedeleted',
      likes: 69,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlogPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const dbBlogs = await helper.blogsInDb()
    expect(dbBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const toDel = await Blog.findOne({ title: newBlogPost.title })

    await api
      .delete(`/api/blogs/${toDel.id}`)
      .set('Authorization', token)
      .expect(204)

    const result = await helper.blogsInDb()
    expect(result).toHaveLength(helper.initialBlogs.length)
  })
})

test('blog updated successfully', async () => {
  const blogs = await helper.blogsInDb()
  const id = blogs[0].id
  const updateBlog = {
    title: 'updated',
    author: 'updated',
    url: 'updated',
    likes: 200,
  }

  await api
    .put(`/api/blogs/${id}`)
    .send(updateBlog)
    .set('Authorization', token)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const updatedBlogList = await helper.blogsInDb()
  expect(updatedBlogList[0].title).toEqual(updateBlog.title)
})

afterAll(() => {
  mongoose.connection.close()
})
