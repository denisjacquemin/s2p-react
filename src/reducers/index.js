import { combineReducers } from 'redux'

import messages from './messages'
import currentMessage from './current-message'
import showOnlyImportant from './show-only-important'
import codes from './codes'
import currentScreen from './current-screen'
import snackbar from './snackbar'
import device from './device'
import currentScrollPositionY from './scroll'





const messageApp = combineReducers({
  messages,
  showOnlyImportant,
  codes,
  currentScreen,
  currentMessage,
  snackbar,
  device,
  currentScrollPositionY
})

export default messageApp
