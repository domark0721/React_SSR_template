
import {
  OPEN_LOGIN,
  VERIFY_TOKEN,
  REFRESH_TOKEN,
  REFRESH_TOKEN_FULLFILLED,
} from '../constants/commonActionTypes'

export const openLogin = () => ({ type: OPEN_LOGIN })
export const verifyToken = () => ({ type: VERIFY_TOKEN })
export const refreshToken = () => ({ type: REFRESH_TOKEN })
export const refreshTokenFullfilled = () => ({ type: REFRESH_TOKEN_FULLFILLED })
