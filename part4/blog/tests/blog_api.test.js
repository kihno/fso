const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.testBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.testBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.testBlogs.length)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('blog has id property', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.testBlogs.length + 1)

  const titles = blogsAtEnd.map((blog) => blog.title)
  expect(titles).toContain('Canonical string reduction')
})

test('if likes is undefined, default is set to 0', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  }

  const response = await api.post('/api/blogs').send(newBlog)

  expect(response.body.likes).toBe(0)
})

test('get with id returns single blog', async () => {
  const blog = await Blog.findOne()

  const response = await api.get(`/api/blogs/${blog.id}`)
  const blogsAtEnd = await helper.blogsInDb()
  const foundBlog = blogsAtEnd.filter((b) => { return b.id === blog.id })[0]

  expect(response.body).toEqual(foundBlog)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
})

test('blog without a url is not added', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.testBlogs.length)
})

test('deleting blog removes it from database', async () => {
  const blog = await Blog.findOne()

  await api
    .delete(`/api/blogs/${blog.id}`)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.testBlogs.length - 1)
})

test('blog has its like property updated', async () => {
  const blog = await Blog.findOne()
  const updatedBlog = {
    likes: 313,
  }

  await api
    .put(`/api/blogs/${blog.id}`)
    .send(updatedBlog)

  const blogsAtEnd = await helper.blogsInDb()
  const afterUpdateBlog = blogsAtEnd.filter((b) => { return b.id === blog.id })

  expect(afterUpdateBlog[0].likes).toBe(313)
})

afterAll(async () => {
  await mongoose.connection.close()
})
