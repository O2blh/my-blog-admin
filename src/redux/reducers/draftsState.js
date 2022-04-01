export const ACTIONS = {
  GET_DRAFTS: 'GET_DRAFTS',
}

const initialState = {
  data: [],
}

export default function addReducer(preState = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.GET_DRAFTS:
      return {
        ...preState,
        data: payload,
      }
    default:
      return preState
  }
}
