import { db } from './cloudBase'

export const _createFriendLink = async (friendLink) => {
  const res = await db.collection('friendLink').add(friendLink)
  return res
}

export const _deleteFriendLink = async (id) => {
  const res = await db.collection('friendLink').doc(id).remove()
  return res
}

export const _updateFriendLink = async (id, friendLink) => {
  const res = await db.collection('friendLink').doc(id).update(friendLink)
  return res
}

export const _getFriendLinks = async () => {
  const result = await db.collection('friendLink').get()
  return result.data
}
