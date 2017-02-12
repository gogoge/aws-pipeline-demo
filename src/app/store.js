import { createStore, combineReducers } from 'redux'
import { reducer as mainReducer } from './containers/Main'

const reducer = combineReducers({ mainReducer })
export const store = createStore(reducer)
