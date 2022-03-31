import { db } from './cloudBase'

export const _createDrafts = async (drafts) => {
  const res = await db.collection('drafts').add(drafts)
  return res
}

export const _deleteDrafts = async (id) => {
  const res = await db.collection('drafts').doc(id).remove()
  return res
}

export const _updateDrafts = async (id, drafts) => {
  const res = await db.collection('drafts').doc(id).update(drafts)
  return res
}

export const _getAllDrafts = async () => {
  const result = await db.collection('drafts').get()
  return result.data
}

export const _getDraftById = async (id) => {
  const result = await db
    .collection('drafts')
    .where({
      _id: id,
    })
    .get()
  return result.data
}
