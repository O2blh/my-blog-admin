import { db } from './cloudBase'

export const _createsay = async (say) => {
  const res = await db.collection('say').add(say)
  return res
}

export const _deletesay = async (id) => {
  const res = await db.collection('say').doc(id).remove()
  return res
}

export const _updatesay = async (id, say) => {
  const res = await db.collection('say').doc(id).update(say)
  return res
}

export const _getsays = async () => {
  const result = await db.collection('say').get()
  return result.data
}
