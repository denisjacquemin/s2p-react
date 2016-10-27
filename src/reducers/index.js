import { combineReducers } from 'redux'

import messages from './messages'
import currentMessage from './current-message'
import showOnlyImportant from './show-only-important'
import codes from './codes'
import currentScreen from './current-screen'
import snackbar from './snackbar'
import device from './device'
import currentScrollPositionY from './scroll'
import invalidCodeMessage from './invalidCodeMessage'
import validCode from './validCode'
import showAddCodeForm from './showAddCodeForm'

const messageApp = combineReducers({
  messages,
  showOnlyImportant,
  codes,
  currentScreen,
  currentMessage,
  snackbar,
  device,
  currentScrollPositionY,
  invalidCodeMessage,
  validCode,
  showAddCodeForm
})

export default messageApp
