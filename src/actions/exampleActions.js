import {
  FETCH_MUSIC_INFO,
  RECEIVE_MUSIC_INFO,
} from '../constants/actionTypes'


export const fetchMusicInfo = () => ({ type: FETCH_MUSIC_INFO })
export const receiveMusicInfo = data => ({
  type: RECEIVE_MUSIC_INFO,
  data,
})
