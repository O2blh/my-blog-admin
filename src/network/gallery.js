import { db } from './cloudBase'

export const _createGallery = async (gallery) => {
  const res = await db.collection('gallery').add(gallery)
  return res
}

export const _deleteGallery = async (id) => {
  const res = await db.collection('gallery').doc(id).remove()
  return res
}

export const _updateGallery = async (id, gallery) => {
  const res = await db.collection('gallery').doc(id).update(gallery)
  return res
}

export const _getGallery = async () => {
  const result = await db.collection('gallery').get()
  return result.data
}

export const _getGalleryById = async (id) => {
  const result = await db
    .collection('gallery')
    .where({
      _id: id,
    })
    .get()
  return result.data
}
