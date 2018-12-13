import { combineReducers } from 'redux'
import commonReducer from './commonReducer'
import exampleReducer from './exampleReducer'

export default combineReducers({
  commonReducer,
  exampleReducer,
})
