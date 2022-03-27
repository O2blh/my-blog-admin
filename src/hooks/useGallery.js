import React from 'react'
import { _getGallery } from '../network/gallery'

const { useState, useEffect } = React

export default function useGallery() {
  const [gallery, setGallery] = useState([])
  const getGalleryFromDB = async () => {
    const data = await _getGallery()
    setGallery(data)
  }

  useEffect(() => {
    getGalleryFromDB()
  }, [])
  return [gallery, getGalleryFromDB]
}
