const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET': {
      return action.msg
    }
    case 'CLEAR': {
      return ''
    }
    default: {
      return state
    }
  }
}
let timeouts = []
export const setNotification = (msg, to) => {
  clearTimeout(timeouts[timeouts.length - 1])
  return async dispatch => {
    dispatch({
      type: 'SET',
      msg,
    })
    timeouts.push(
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, to * 1000)
    )
  }
}

export default notificationReducer
