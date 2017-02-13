import { ACTION_TYPES } from './action-types'
import { put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

function* asyncLoad() {
  yield delay(3000)
  yield put({ type: ACTION_TYPES.INCREASE })
}

function* watchAsyncLoad() {
  yield takeEvery(ACTION_TYPES.ASYNC_LOAD, asyncLoad)
}

export default { watchAsyncLoad }
