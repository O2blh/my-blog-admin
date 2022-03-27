import React from 'react'
import { _getAllTag } from '../network/tag'

const { useState, useEffect } = React

export default function useTag() {
  const [tagList, setTagList] = useState([])
  const getTagsFromDB = async () => {
    const data = await _getAllTag()
    setTagList(data)
  }

  useEffect(() => {
    getTagsFromDB()
  }, [])
  return [tagList, getTagsFromDB]
}
