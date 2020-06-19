import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANEC':
      return action.data
    case 'ADD_VOTE': {
      const id = action.data.id
      const anecToChange = state.find(n => n.id === id)
      const newAnec = {
        ...anecToChange,
        votes: anecToChange.votes + 1,
      }
      return state.map(anec => (anec.id !== id ? anec : newAnec))
    }
    case 'NEW_ANEC': {
      return [...state, action.data]
    }
    default:
      return state
  }
}

export const initAnecs = () => {
  return async dispatch => {
    const anecs = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecs,
    })
  }
}

export const createAnec = data => {
  return {
    type: 'NEW_ANEC',
    data,
  }
}

export const addVote = id => {
  return {
    type: 'ADD_VOTE',
    data: { id },
  }
}

export default anecdoteReducer
