import { createContext, useContext, useReducer } from 'react'

const blogsReducer = (state, action) => {
  switch (action.type) {
  case 'CREATE':
    return action.payload
  case 'UPDATE':
    return state.map(b => b.id !== action.payload ? b : action.payload)
  case 'DELETE':
    return action.payload
  default:
    return state
  }
}

const BlogsContext = createContext()

export const BlogsContextProvider = (props) => {
  const [blogs, blogsDispatch] = useReducer(blogsReducer, [])

  return (
    <BlogsContext.Provider value={[blogs, blogsDispatch]}>
      {props.children}
    </BlogsContext.Provider>
  )
}

export const useBlogsValue = () => {
  const blogsAndDispatch = useContext(BlogsContext)
  return blogsAndDispatch[0]
}

export const useBlogsDispatch = () => {
  const blogsAndDispatch = useContext(BlogsContext)
  return blogsAndDispatch[1]
}

export default BlogsContext
