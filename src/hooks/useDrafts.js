import { useState, useEffect } from 'react'
import { _getAllDrafts } from '../network/drafts'

export default function useDrafts() {
  const [drafts, setDrafts] = useState([])
  const getDraftsFromDb = async () => {
    const res = await _getAllDrafts()
    setDrafts(res.data)
  }
  useEffect(() => {
    getDraftsFromDb()
  }, [])
  return [drafts, getDraftsFromDb]
}
