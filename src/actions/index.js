import fetch from 'isomorphic-fetch'
import moment from 'moment'

const serializeJSON = (data) => {
  return Object.keys(data).map(function (keyName) {
    return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
  }).join('&');
}


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
    type: 'REQUEST_MESSAGES'
  }
}


export const receiveMessages = (json) => {
  console.log('receiveMessages: ' + JSON.stringify(json))
  return {
    type: 'RECEIVE_MESSAGES',
    messages: json,
    receivedAt: moment().format('YYYY-MM-DD') // now
  }
}

export const fetchMessages = () => {
  return function (dispatch, getState) {
    dispatch(requestMessages())

    const { codes, messages } = getState()

    let lastUpdate = messages.lastUpdate
    if (lastUpdate === undefined) {
      lastUpdate = moment().format('YYYY-MM-DD') // now
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
