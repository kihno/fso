import { useState } from 'react'

const BlogForm = (props) => {
  const { createBlog } = props

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input id="title" type="text" value ={title} name="Username" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input id="author" type="text" value ={author} name="Username" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input id="url" type="text" value ={url} name="Username" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id="submit-btn" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
