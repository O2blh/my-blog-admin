export const ACTIONS = {
  GET_CLASSIFIES: 'GET_CLASSIFIES',
}

const initialState = {
  data: [],
}

export default function addReducer(preState = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.GET_CLASSIFIES:
      return {
        ...preState,
        data: payload,
      }
    default:
      return preState
  }
}
