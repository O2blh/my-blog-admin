import { sessionLocalStorage } from '../../utils/session'

const session = sessionLocalStorage.getItem()
const initState = {
  isLogined: !!session.content,
  user: session,
}

export const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
}

export default function addReducer(preState = initState, action) {
  const { type, payload } = action
  switch (type) {
    case ACTIONS.LOGIN:
      return {
        ...preState,
        isLogined: true,
        user: payload,
      }
    case ACTIONS.LOGOUT:
      return {
        ...preState,
        isLogined: false,
        user: {},
      }
    default:
      return preState
  }
}
