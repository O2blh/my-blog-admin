import { db } from './cloudBase'

export const _createAbout = async (about) => {
  const res = await db.collection('about').add(about)
  return res
}

export const _deleteAbout = async (id) => {
  const res = await db.collection('about').doc(id).remove()
  return res
}

export const _updateAbout = async (id, about) => {
  const res = await db.collection('about').doc(id).update(about)
  return res
}

export const _getAllAbout = async () => {
  const result = await db.collection('about').get()
  return result.data
}

export const _getAboutMe = async () => {
  const result = await db
    .collection('about')
    .where({
      type: 1,
    })
    .get()
  return result.data
}

export const _getAboutSite = async () => {
  const result = await db
    .collection('about')
    .where({
      type: 0,
    })
    .get()
  return result.data
}

export const _getAbout = async (type) => {
  const result = await db
    .collection('about')
    .where({
      type,
    })
    .get()
  return result.data
}
