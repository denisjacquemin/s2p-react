import fetch from 'isomorphic-fetch'

export const showFullMessage = (id) => {
  return {
    type: 'SHOW_FULL_MESSAGE',
    id
  }
}

export const toggleShowImportant = () => {
  return {
    type: 'TOGGLE_SHOW_IMPORTANT'
  }
}

export const toggleImportant = () => {
  return {
    type: 'TOGGLE_IMPORTANT'
  }
}



export const requestMessages = (params = {}) => {
  return {
    type: 'REQUEST_MESSAGES',
    params: params
  }
}


export const receiveMessages = (json) => {
  return {
    type: 'RECEIVE_MESSAGES',
    messages: json,
    receivedAt: Date.now()
  }
}

export const fetchMessages = (params) => {
  return function (dispatch) {
    dispatch(requestMessages(params))
    return fetch('https://s2p-api-demo.herokuapp.com/latest', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: params
    }).then(response => response.json())
      .then(json =>
        dispatch(receiveMessages(subreddit, json))
      )
  }
}

export const addCode = (code) => {
  return {
    type: 'ADD_CODE',
    code: code,
    last_update: Date.now()
  }
}

export const showCodeSaved = () => {
  return {
    type: 'SHOW_CODE_SAVED'
  }
}

export const showMessagesScreen =() => {
  return {
    type: 'SHOW_MESSAGES_SCREEN'
  }
}
