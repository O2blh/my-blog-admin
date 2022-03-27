import { db } from './cloudBase'

export const _createfriendLink = async (friendLink) => {
  const res = await db.collection('friendLink').add(friendLink)
  return res
}

export const _deletefriendLink = async (id) => {
  const res = await db.collection('friendLink').doc(id).remove()
  return res
}

export const _updatefriendLink = async (id, friendLink) => {
  const res = await db.collection('friendLink').doc(id).update(friendLink)
  return res
}

export const _getfriendLinks = async () => {
  const result = await db.collection('friendLink').get()
  return result.data
}
