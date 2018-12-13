import {
  FETCH_MUSIC_INFO,
  RECEIVE_MUSIC_INFO,
} from '../constants/actionTypes'

const initialState = {
  isFetching: false,
  data: {},
}

function example(state = initialState, action) {
  switch (action.type) {
    case FETCH_MUSIC_INFO:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_MUSIC_INFO: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
      }
    }
    default:
      return state
  }
}

export default example
