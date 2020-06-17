const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'VOTE': {
      return `You voted "${action.anecdote}"`
    }
    case 'CREATE': {
      return `Created anecdote "${action.anecdote}"`
    }
    case 'CLEAR': {
      return ''
    }
    default: {
      return state
    }
  }
}

export const voteMsg = anecdote => {
  return {
    type: 'VOTE',
    anecdote,
  }
}

export const showCreate = anecdote => ({
  type: 'CREATE',
  anecdote,
})

export const resetMsg = () => {
  return {
    type: 'CLEAR',
  }
}

export default notificationReducer
