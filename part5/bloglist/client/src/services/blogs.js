import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const updateBlog = async blogObj => {
  const updatedBlog = {
    user: blogObj.user.id,
    likes: blogObj.likes + 1,
    author: blogObj.author,
    title: blogObj.title,
    url: blogObj.url,
  }
  const request = await axios.put(`${baseUrl}/${blogObj.id}`, updatedBlog)
  return request.data
}
export default { getAll, create, setToken, updateBlog }
