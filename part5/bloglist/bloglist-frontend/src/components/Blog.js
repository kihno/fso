import { useState } from "react"

const Blog = (props) => {
  const { user, blog, updateBlog, deleteBlog } = props

  const [buttonLabel, setButtonLabel] = useState('view')
  const [hidden, setHidden] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = (event) => {
    event.preventDefault()

    if (buttonLabel === 'view') {
      setButtonLabel('hide')
    } else {
      setButtonLabel('view')
    }

    setHidden(!hidden)
  }

  const updateLikes = (event) => {
    event.preventDefault()

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    updateBlog(blog.id, updatedBlog)
  }

  const removeBlog = (event) => {
    event.preventDefault()

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={handleClick}>{buttonLabel}</button>
      { hidden ?
        null
        : <div>
            <div>{blog.url}</div>
            <div>{blog.likes}<button onClick={updateLikes}>like</button></div>
            <div>{blog.user && blog.user.name}</div>
            {blog.user && blog.user.username === user.username ? <button onClick={removeBlog}>remove</button> : null}
          </div>}
    </div>  
  )
}

export default Blog
