import { db } from './cloudBase'

export const _createWorks = async (works) => {
  const res = await db.collection('works').add(works)
  return res
}

export const _deleteWorks = async (id) => {
  const res = await db.collection('works').doc(id).remove()
  return res
}

export const _updateWorks = async (id, works) => {
  const res = await db.collection('works').doc(id).update(works)
  return res
}

export const _getAllWorks = async () => {
  const result = await db.collection('works').get()
  return result.data
}
