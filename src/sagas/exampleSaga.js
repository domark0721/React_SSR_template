import { takeEvery, call, put } from 'redux-saga/effects'
import axios from 'axios'
// import { apiPath } from '../utils/ServiceUtils'
import { receiveMusicInfo } from '../actions/exampleActions'

import { FETCH_MUSIC_INFO } from '../constants/actionTypes'

const fetchInfo = () => axios
  .get('https://jsonplaceholder.typicode.com/todos/1')
// .get(apiPath('/webapi/v1/room/list'))
  // .get('webapi/v1/room/list')
  .then(r => r)

export function* requestMusicInfo() {
  const res = yield call(fetchInfo)
  console.log(res)
  yield put(receiveMusicInfo(res.data))
}

export function* watchFetchMusicInfo() {
  // console.log('watchFetchMusicInfo')
  yield takeEvery(FETCH_MUSIC_INFO, requestMusicInfo)
}

export const exampleSaga = [watchFetchMusicInfo()]
