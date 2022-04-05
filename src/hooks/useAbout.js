import React from 'react'
import { _getAllAbout } from '../network/about'

const { useState, useEffect } = React

export default function useAbout() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [aboutList, setAboutList] = useState([])
  const getAboutFromDB = async () => {
    const data = await _getAllAbout()
    setAboutList(data)
    setIsLoaded(true)
  }
  useEffect(() => {
    console.log(1)
    if (!isLoaded) {
      getAboutFromDB()
    }
  }, [])
  return [aboutList, getAboutFromDB]
}
