const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET': {
      return action.msg
    }
    // case 'CREATE': {
    //   return `Created anecdote "${action.anecdote}"`
    // }
    case 'CLEAR': {
      return ''
    }
    default: {
      return state
    }
  }
}

export const setNotification = (msg, to) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      msg,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
      })
    }, to * 1000)
  }
}

export default notificationReducer
