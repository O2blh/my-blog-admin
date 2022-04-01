import { combineReducers } from 'redux'
import LoginState from './loginState'
import DraftsState from './draftsState'
import ArticlesState from './articlesState'
import TagState from './tagState'
import ClassifyState from './classifyState'
import SayState from './sayState'
import FrinendLinkState from './linkState'
import MsgState from './msgState'

export default combineReducers({
  LoginState,
  DraftsState,
  ArticlesState,
  TagState,
  ClassifyState,
  SayState,
  FrinendLinkState,
  MsgState,
})
