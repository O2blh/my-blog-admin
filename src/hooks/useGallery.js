import React from 'react'
import { _getGallery } from '../network/gallery'

const { useState, useEffect } = React

export default function useGallery() {
  const [gallery, setGallery] = useState([])
  const getGalleryFromDB = () => {
    const data = _getGallery()
    setGallery(data)
  }

  useEffect(() => {
    getGalleryFromDB()
  }, [])
  return [gallery, getGalleryFromDB]
}
