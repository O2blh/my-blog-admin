import { useState, useEffect } from 'react'
import { _getDrafts } from '../network/drafts'

export default function useDrafts() {
  const [drafts, setDrafts] = useState([])
  const getDraftsFromDb = async () => {
    const res = await _getDrafts()
    setDrafts(res)
  }
  useEffect(() => {
    getDraftsFromDb()
  }, [])
  return [drafts, getDraftsFromDb]
}
