const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('db cleared')

  const blogObjects = helper.initialBlogs.map(b => new Blog(b))
  const promiseArr = blogObjects.map(b => b.save())
  await Promise.all(promiseArr)

  console.log('beforeEach done')
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

afterAll(() => {
  mongoose.connection.close()
})
