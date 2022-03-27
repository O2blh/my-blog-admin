import React from 'react'
import { db } from '../network/cloudBase'

const { useState, useEffect } = React

export default function useTag() {
  const [tagList, setTagList] = useState([])
  const getTagsFromDB = () => {
    db.collection('tag')
      .get()
      .then((res) => {
        setTagList(res.data)
      })
  }

  useEffect(() => {
    getTagsFromDB()
  }, [])
  return [tagList, getTagsFromDB]
}
