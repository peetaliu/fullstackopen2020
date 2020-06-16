const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'VOTE': {
      return `You voted "${action.data.content}"`
    }
    case 'CREATE': {
      return `Created note "${action.data.content}"`
    }
    case 'CLEAR': {
      return ''
    }
    default: {
      return state
    }
  }
}

export const voteMsg = content => {
  return {
    type: 'VOTE',
    data: { content },
  }
}

export const showCreate = content => ({
  type: 'CREATE',
  data: { content },
})

export const resetMsg = () => {
  return {
    type: 'CLEAR',
    data: {},
  }
}

export default notificationReducer
