import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/posts'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createPost = async (newPost) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newPost, config)
  return response.data
}

const updatePost = async (id, update) => {
  const response = await axios.patch(`${baseUrl}/${id}`, update)
  return response.data
}

const deletePost = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export { getAll, createPost, updatePost, setToken, deletePost }
