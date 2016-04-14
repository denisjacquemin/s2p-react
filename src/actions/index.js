import fetch from 'isomorphic-fetch'
import moment from 'moment'

export const showFullMessage = (id) => {
  return {
    type: 'SHOW_FULL_MESSAGE',
    id: id
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
  return {
    type: 'RECEIVE_MESSAGES',
    messages: json,
    receivedAt: moment().utc().format('YYYY-MM-DD [[]HH:mm:ss[]]') // now(UTC) yyyy-mm-dd [hh:mm:ss]
  }
}

export const handleFetchError = () => {
  return {
    type: 'HANDLE_REQUEST_MESSAGES_ERROR'
  }
}

export const fetchMessages = () => {
  return function (dispatch, getState) {
    // check if another fetch request is still in progress
    const { codes, messages } = getState()
    if (!messages.isFetching) {
      dispatch(requestMessages())



      let lastUpdate = messages.lastUpdate
      if (lastUpdate === undefined) {
        lastUpdate = moment().utc().format('YYYY-MM-DD [[]HH:mm:ss[]]') // now(UTC) yyyy-mm-dd [hh:mm:ss]
      }

      let params = '?last_update=' + lastUpdate
      for(let c of codes) {
        params += '&codes[]=' + c.code
      }

      // https://s2p-api-demo.herokuapp.com/messages
      return fetch('https://s2p-api-demo.herokuapp.com/messages' + params, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(function(response) {
        if(response.ok) {
          console.log('fetch response ok')
          return response.json().then(function(json) {
            dispatch(receiveMessages(json))
          })
        } else {
          console.log('fetch response not ok, reset messages.isFetching');
          dispatch(handleFetchError())
        }
      })
      .catch(function(err) {
        dispatch(handleFetchError())
        dispatch(showSnackbar('Pas de connexion'))
      })
    }
  }
}


export const addCode = (code) => {
  return function (dispatch, getState) {
    // https://s2p-api-demo.herokuapp.com
    return fetch('https://s2p-api-demo.herokuapp.com/getfullnamebycode/' + code, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      if(response.ok) {
        console.log('fetch response ok')
        return response.json().then(function(json) {
          dispatch(receiveFullnameByCode(json))
        })
      } else {
        console.log('fetch response not ok, reset messages.isFetching');
        dispatch(handleFetchError())
      }
    })
    .catch(function(err) {
      dispatch(handleFetchError())
      dispatch(showSnackbar('Pas de connexion'))
    })
  }
}

export const receiveFullnameByCode = (json) => {
  return {
    type: 'ADD_CODE',
    fullname: json.fullname,
    code: json.code,
    receivedAt: moment().utc().format('YYYY-MM-DD [[]HH:mm:ss[]]') // now(UTC) yyyy-mm-dd [hh:mm:ss]
  }
}

export const showCodeSaved = () => {
  return {
    type: 'SHOW_CODE_SAVED'
  }
}

export const showCodeList = () => {
  return {
    type: 'SHOW_CODE_LIST'
  }
}

export const showMessagesScreen =() => {
  return {
    type: 'SHOW_MESSAGES_SCREEN'
  }
}

export const showSnackbar = (message) => {
  return {
    type: 'SHOW_SNACKBAR',
    message: message
  }
}

export const hideSnackbar = () => {
  return {
    type: 'HIDE_SNACKBAR'
  }
}
