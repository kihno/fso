import { createContext, useReducer } from 'react'

const blogsReducer = (state, action) => {
  switch (action.type) {
  case 'CREATE':
    return action.payload
  case 'UPDATE':
    return action.payload
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

export default BlogsContext
