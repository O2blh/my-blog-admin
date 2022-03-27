import { db } from './cloudBase'

export const _createfriendLInk = async (friendLInk) => {
  const res = await db.collection('friendLInk').add(friendLInk)
  return res
}

export const _deletefriendLInk = async (id) => {
  const res = await db.collection('friendLInk').doc(id).remove()
  return res
}

export const _updatefriendLInk = async (id, friendLInk) => {
  const res = await db.collection('friendLInk').doc(id).update(friendLInk)
  return res
}

export const _getfriendLInks = async () => {
  const result = await db.collection('friendLInk').get()
  return result.data
}
