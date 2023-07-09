const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  let passwordHash = await bcrypt.hash(helper.testUsers[0].password, 10)
  let user = new User({ username: helper.testUsers[0].username, passwordHash })
  await user.save()

  passwordHash = await bcrypt.hash(helper.testUsers[1].password, 10)
  user = new User({ username: helper.testUsers[1].username, passwordHash })
  await user.save()

  const userLogin = {
    username: helper.testUsers[0].username,
    password: helper.testUsers[0].password
  }

  const login = await api
    .post('/api/login')
    .send(userLogin)

  token = login.body.token
  
  const users = await User.find({})

  let blogObject = new Blog({
    title: helper.testBlogs[0].title,
    url: helper.testBlogs[0].url,
    user: users[0]
  })
  await blogObject.save()


  blogObject = new Blog({
    title: helper.testBlogs[1].title,
    url: helper.testBlogs[1].url,
    user: users[1]
  })
  await blogObject.save()
})

describe('when user is authenticated', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
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
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }
  
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
    expect(response.body.likes).toBe(0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
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
      .set('Authorization', `Bearer ${token}`)
  
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
})

describe('when a user is not authenticated', () => {
  test('cannot create new blog', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAtEnd)
  
    expect(response.body.error).toBe('jwt must be provided')
  })

  test('cannot delete blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blog = await Blog.findOne()
  
    const response = await api
      .delete(`/api/blogs/${blog.id}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtStart).toEqual(blogsAtEnd)

    expect(response.body.error).toBe('jwt must be provided')
  })
})

describe('blog api', () => {
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
})

afterAll(async () => {
  await mongoose.connection.close()
})
