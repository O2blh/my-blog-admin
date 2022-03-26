import { db } from './cloudBase'

export const _createTag = async (tag) => {
  const res = await db.collection('tag').add(tag)
  return res
}

export const _deleteTag = async (id) => {
  const res = await db.collection('tag').doc(id).remove()
  return res
}

export const _updateTag = async (id, tag) => {
  const res = await db.collection('tag').doc(id).update(tag)
  return res
}

export const _getTags = async () => {
  const result = await db.collection('tag').get()
  return result.data
}
