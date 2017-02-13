import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as mainReducer, sagas as mainSagas } from './containers/Main'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({ mainReducer })
export const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mainSagas.watchAsyncLoad)
