import React from 'react'
import { db } from '../network/cloudBase'

const { useState, useEffect } = React

export default function useGallery() {
  const [gallery, setGallery] = useState([])
  const getGalleryFromDB = () => {
    db.collection('gallery')
      .get()
      .then((res) => {
        console.log(res.data)
        setGallery(res.data)
      })
  }

  useEffect(() => {
    getGalleryFromDB()
  }, [])
  return [gallery, getGalleryFromDB]
}
