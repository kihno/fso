const Blog = require('../models/blog')
const User = require('../models/user')

const testUsers = [
  {
    username: "root",
    password: "salainen",
    name: "root"
  },
  {
    username: "test",
    password: "password",
    name: "test"
  }
]
  
const testBlogs = [
  {
    title: 'React patterns',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  testUsers,
  testBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
