import { combineReducers } from 'redux'

import messages from './messages'
import currentMessage from './current-message'
import showOnlyImportant from './show-only-important'
import codes from './codes'
import currentScreen from './current-screen'
import snackbar from './snackbar'
import device from './device'





const messageApp = combineReducers({
  messages,
  showOnlyImportant,
  codes,
  currentScreen,
  currentMessage,
  snackbar,
  device
})

export default messageApp
