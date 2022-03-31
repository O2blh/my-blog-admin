export const ACTIONS = {
  GET_ARTICLES: 'GET_ARTICLES',
}

const initialState = {}

export default function addReducer(preState = initialState, action) {
  switch (action.type) {
    case ACTIONS.GET_ARTICLES:
      return {
        ...preState,
        artilces: action.payload,
      }
    default:
      return preState
  }
}
