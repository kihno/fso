import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const mockHandler = jest.fn()

  const user = {
    name: 'test user',
    username: 'test',
    id: 1,
  }

  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'Blog URL',
    likes: 7,
    user: user,
  }

  beforeEach(() => {
    container = render(
      <Blog blog={blog} updateBlog={mockHandler} user={user} />,
    ).container
  })

  test('renders title and author', () => {
    const blogDiv = container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent('Blog Title Blog Author view')
  })

  test('does not render url or likes by default', () => {
    const urlDiv = container.querySelector('.blog-url')
    expect(urlDiv).toBeNull()

    const likesDiv = container.querySelector('.blog-likes')
    expect(likesDiv).toBeNull()
  })

  test('renders url and likes when view is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlDiv = container.querySelector('.blog-url')
    expect(urlDiv).toHaveTextContent('Blog URL')

    const likesDiv = container.querySelector('.blog-likes')
    expect(likesDiv).toHaveTextContent('7 like')
  })

  test('clicking the like button calls event handler twice', async () => {
    const user = userEvent.setup()
    const viewBtn = screen.getByText('view')
    await user.click(viewBtn)

    const likeBtn = screen.getByText('like')
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
