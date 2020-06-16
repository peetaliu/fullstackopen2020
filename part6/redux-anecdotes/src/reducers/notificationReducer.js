const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'VOTE': {
      return action.data.content
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

export default notificationReducer
