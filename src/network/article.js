import { db } from './cloudBase'

export const _createArtilce = async (article) => {
  const res = await db.collection('article').add(article)
  return res
}

export const _deleteArtilce = async (id) => {
  const res = await db.collection('article').doc(id).remove()
  return res
}

export const _updateArtilce = async (id, article) => {
  const res = await db.collection('article').doc(id).update(article)
  return res
}

export const _getArtilceById = async (id) => {
  const result = await db
    .collection('article')
    .where({
      _id: id,
    })
    .get()
  return result.data
}

export const _getArtilce = async () => {
  const result = await db.collection('article').get()
  return result.data
}