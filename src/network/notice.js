import { db } from './cloudBase'

export const _createNotice = async (notice) => {
  const res = await db.collection('notice').add(notice)
  return res
}

export const _deleteNotice = async (id) => {
  const res = await db.collection('notice').doc(id).remove()
  return res
}

export const _updateNotice = async (id, notice) => {
  const res = await db.collection('notice').doc(id).update(notice)
  return res
}

export const _getNotice = async () => {
  const result = await db.collection('notice').get()
  return result.data
}
