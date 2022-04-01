export const ACTIONS = {
  GET_TAGS: 'GET_TAGS',
}

const initialState = {
  data: [],
}

export default function addReducer(preState = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.GET_TAGS:
      return {
        ...preState,
        data: payload,
      }
    default:
      return preState
  }
}
