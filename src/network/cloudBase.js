import cloudbase from '@cloudbase/js-sdk'
import { ENV_ID } from '../constants/siteInfo'

export const app = cloudbase.init({
  env: ENV_ID,
})

export const auth = app.auth()

export const db = app.database()

export const _ = db.command
