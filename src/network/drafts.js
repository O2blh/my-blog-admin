import { db } from './cloudBase'

export const _createDraft = async (drafts) => {
  const res = await db.collection('drafts').add(drafts)
  return res
}

export const _deleteDraft = async (id) => {
  const res = await db.collection('drafts').doc(id).remove()
  return res
}

export const _updateDraft = async (id, drafts) => {
  const res = await db.collection('drafts').doc(id).update(drafts)
  return res
}

export const _getDrafts = async () => {
  const result = await db
    .collection('drafts')
    .where({
      isPublished: false,
    })
    .field({
      articleTitle: true,
      abstract: true,
      classify: true,
      modifyDate: true,
      tags: true,
    })
    .orderBy('modifyDate', 'desc')
    .get()
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
