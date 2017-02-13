import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as mainReducer, sagas as mainSagas } from './containers/Main'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'
const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({ mainReducer })
export const store = createStore(reducer, applyMiddleware(sagaMiddleware))

function *rootSaga() {
  yield fork(mainSagas.watchAsyncLoad)
  yield fork(mainSagas.watchFetchData)
}
sagaMiddleware.run(rootSaga)
