import fetch from 'isomorphic-fetch'
import moment from 'moment'

export const showFullMessage = (id) => {
  return {
    type: 'SHOW_FULL_MESSAGE'
  }
}

export const toggleShowImportant = () => {
  return {
    type: 'TOGGLE_SHOW_IMPORTANT'
  }
}

export const toggleImportant = (message_id) => {
  return {
    type: 'TOGGLE_IMPORTANT',
    id: message_id
  }
}



export const requestMessages = (params = {}) => {
  return {
    type: 'REQUEST_MESSAGES'
  }
}


export const receiveMessages = (json) => {
  console.log('receiveMessages: ' + JSON.stringify(json))
  return {
    type: 'RECEIVE_MESSAGES',
    messages: json,
    receivedAt: moment().utc().format('YYYY-MM-DD [[]h:mm:ss[]]') // now(UTC) yyyy-mm-dd [hh:mm:ss]
  }
}

export const fetchMessages = () => {
  return function (dispatch, getState) {
    dispatch(requestMessages())

    const { codes, messages } = getState()

    let lastUpdate = messages.lastUpdate
    if (lastUpdate === undefined) {
      lastUpdate = moment().utc().format('YYYY-MM-DD [[]h:mm:ss[]]') // now(UTC) yyyy-mm-dd [hh:mm:ss]
    }

    let params = '?last_update=' + lastUpdate
    for(let c of codes) {
      params += '&codes[]=' + c.code
    }

    //https://s2p-api-demo.herokuapp.com/
    return fetch('https://s2p-api-demo.herokuapp.com/messages' + params, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(json =>
        dispatch(receiveMessages(json))
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
