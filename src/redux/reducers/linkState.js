export const ACTIONS = {
  GET_FRIEND_LINKS: 'GET_FRIEND_LINKS',
}

const initialState = {
  data: [],
}

export default function addReducer(preState = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.GET_FRIEND_LINKS:
      return {
        ...preState,
        data: payload,
      }
    default:
      return preState
  }
}
