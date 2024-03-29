import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

export const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export const updateBlog = async (newObject) => {
  const response = await axios.put(`${ baseUrl }/${newObject.id}`, newObject)
  return response.data
}

export const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}
