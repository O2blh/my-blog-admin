export const ACTIONS = {
  GET_ARTICLES: 'GET_ARTICLES',
}

const initialState = {
  data: [],
}

export default function addReducer(preState = initialState, { type, payload }) {
  switch (type) {
    case ACTIONS.GET_ARTICLES:
      return {
        ...preState,
        data: payload,
      }
    default:
      return preState
  }
}
