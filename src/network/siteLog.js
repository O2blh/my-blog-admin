import { db } from './cloudBase'

export const _createSiteLog = async (siteLog) => {
  const res = await db.collection('siteLog').add(siteLog)
  return res
}

export const _deleteSiteLog = async (id) => {
  const res = await db.collection('siteLog').doc(id).remove()
  return res
}

export const _updateSiteLog = async (id, siteLog) => {
  const res = await db.collection('siteLog').doc(id).update(siteLog)
  return res
}

export const _getSiteLog = async () => {
  const result = await db.collection('siteLog').orderBy('logDate', 'desc').get()
  return result.data
}
