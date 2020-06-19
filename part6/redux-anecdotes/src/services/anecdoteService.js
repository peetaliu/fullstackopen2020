import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createAnec = async anec => {
  const obj = { content: anec, votes: 0 }
  const res = await axios.post(baseUrl, obj)
  return res.data
}

const updateAnec = async anec => {
  const updatedAnec = {
    ...anec,
    votes: anec.votes + 1,
  }
  const res = await axios.put(`${baseUrl}/${anec.id}`, updatedAnec)
  return res.data
}

export default { getAll, createAnec, updateAnec }
