import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id) => {
  const objectToUpdate = await getOne(id)
  const response = await axios.put(`${baseUrl}/${id}`, { ...objectToUpdate, votes: objectToUpdate.votes + 1 })
  return response.data
}

const services = {
  getAll,
  getOne,
  createNew,
  update
}

export default services
