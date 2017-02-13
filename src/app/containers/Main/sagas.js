import { ACTION_TYPES } from './action-types'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import fetch from 'isomorphic-fetch'

const TEST_URL = 'https://jsonplaceholder.typicode.com/posts'

function getData() {
  return fetch(TEST_URL).then(response => response.json())
}

function* fetchData() {
  try {
    const fetchResult = yield call(getData)
    yield put({ type: ACTION_TYPES.FETCH_TEST_JSON_SUCCEEDED, fetchResult })
  } catch (error) {
    yield put({ type: ACTION_TYPES.FETCH_TEST_JSON_FAILED, error: error.toString() })
  }
}

function* watchFetchData() {
  yield takeLatest(ACTION_TYPES.FETCH_TEST_JSON, fetchData)
}


function* asyncLoad() {
  yield delay(3000)
  yield put({ type: ACTION_TYPES.INCREASE })
}

function* watchAsyncLoad() {
  yield takeEvery(ACTION_TYPES.ASYNC_LOAD, asyncLoad)
}

export default { watchAsyncLoad, watchFetchData }
