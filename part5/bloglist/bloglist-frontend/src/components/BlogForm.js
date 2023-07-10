import { useState } from 'react' 
import blogService from '../services/blogs'

const BlogForm = (props) => {
  const { setNotice, setError } = props

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title, author, url
      })
      setNotice(`${blog.title} by ${blog.author} has been created`)
    } catch(exception) {
      setError(exception.response.data.error)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input type="text" value ={title} name="Username" onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input type="text" value ={author} name="Username" onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input type="text" value ={url} name="Username" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
