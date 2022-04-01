export const ACTIONS = {
  GET_MSGS: 'GET_MSGS',
}

const initialState = {
  data: [],
}

export default function addReducer(preState = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.GET_MSGS:
      return {
        ...preState,
        data: payload,
      }
    default:
      return preState
  }
}
