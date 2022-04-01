export const ACTIONS = {
  GET_SAYS: 'GET_SAYS',
}

const initialState = {
  data: [],
}

export default function addReducer(preState = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.GET_SAYS:
      return {
        ...preState,
        data: payload,
      }
    default:
      return preState
  }
}
