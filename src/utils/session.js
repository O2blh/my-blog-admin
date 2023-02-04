import { DEFAULT_VALUE, sessionStorageFactory } from './sessionStorage'
import { ENV_ID } from '../constants/siteInfo'

const KEY = `user_info_${ENV_ID}`

export const sessionLocalStorage = sessionStorageFactory({
  key: KEY,
  defaultValue: DEFAULT_VALUE.OBJECT,
})
