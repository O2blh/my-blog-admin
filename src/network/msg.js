import { db } from './cloudBase'

export const _createmsg = async (msg) => {
  const res = await db.collection('msg').add(msg)
  return res
}

export const _deletemsg = async (id) => {
  const res = await db.collection('msg').doc(id).remove()
  return res
}

export const _updatemsg = async (id, msg) => {
  const res = await db.collection('msg').doc(id).update(msg)
  return res
}

export const _getmsg = async () => {
  const result = await db.collection('msg').get()
  return result.data
}
