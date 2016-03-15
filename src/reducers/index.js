import { combineReducers } from 'redux'

import messages from './messages'
import showOnlyImportant from './show-only-important'
import codes from './codes'
import modal from './modal'
import currentScreen from './current-screen'


const messageApp = combineReducers({
  messages,
  showOnlyImportant,
  codes,
  modal,
  currentScreen
})

export default messageApp
