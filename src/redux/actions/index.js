import { LOGIN, GET_ARTICLES } from '../constants'

// 登录
export const login = (data) => ({
  type: LOGIN,
  data,
})

export const getArticles = (data) => ({
  type: GET_ARTICLES,
  data,
})
