import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

describe('Togglable BlogForm', () => {
  let container
  const createBlog = jest.fn()

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel='new blog'>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    ).container
  })

  test('togglable container renders its children', async () => {
    await screen.findAllByText('create new')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking button, children are displayed', async () => {
    const user = userEvent.setup()
    const createBtn = screen.getByText('new blog')
    await user.click(createBtn)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('submitting new blog form sends the correct information to the event handler', async () => {
    const user = userEvent.setup()
    const createBtn = screen.getByText('new blog')
    await user.click(createBtn)

    const inputs = screen.getAllByRole('textbox')
    const submitBtn = screen.getByText('create')

    await user.type(inputs[0], 'new blog title')
    await user.type(inputs[1], 'new blog author')
    await user.type(inputs[2], 'new blog url')
    await user.click(submitBtn)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('new blog title')
    expect(createBlog.mock.calls[0][0].author).toBe('new blog author')
    expect(createBlog.mock.calls[0][0].url).toBe('new blog url')
  })
})
