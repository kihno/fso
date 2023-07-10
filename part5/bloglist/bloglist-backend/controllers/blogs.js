const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    user: user._id,
    url: request.body.url,
    likes: request.body.likes || 0,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(201).json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Only the creator of this post can delete it.' })
  }
})

module.exports = blogsRouter
