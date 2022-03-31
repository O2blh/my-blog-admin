import { db, _ } from './cloudBase'

export const _createClassify = async (classify) => {
  const res = await db.collection('classify').add(classify)
  return res
}

export const _deleteClassify = async (id) => {
  const res = await db.collection('classify').doc(id).remove()
  return res
}

export const _updateClassify = async (id, classify) => {
  const res = await db.collection('classify').doc(id).update(classify)
  return res
}

export const _getClassifies = async () => {
  const result = await db.collection('classify').get()
  return result.data
}

// 相应分类数目-1
export const classMinOne = async (oldClass) => {
  const res = await db
    .collection('classify')
    .where({ classify: oldClass })
    .update({
      count: _.inc(-1),
    })
  return res
}

//分类数量+1
export const classPlusOne = async (classify) => {
  const res = db
    .collection('classify')
    .where({ classify: classify })
    .update({
      count: _.inc(1),
    })
  return res
}
