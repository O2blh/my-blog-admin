import { DEFAULT_VALUE, localStorageFactory } from './localStorage'
import { ENV_ID } from '../constants/siteInfo'

const KEY = `user_info_${ENV_ID}`

export const sessionLocalStorage = localStorageFactory({
  key: KEY,
  defaultValue: DEFAULT_VALUE.OBJECT,
})
