import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANEC':
      return action.data
    case 'ADD_VOTE': {
      const id = action.data.update.id
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

export const createAnec = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.createAnec(content)
    dispatch({
      type: 'NEW_ANEC',
      data: newAnec,
    })
  }
}

export const addVote = anec => {
  return async dispatch => {
    const update = await anecdoteService.updateAnec(anec)
    dispatch({
      type: 'ADD_VOTE',
      data: { update },
    })
  }
}

export default anecdoteReducer
