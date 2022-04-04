import React from 'react'
import { _getAllAbout } from '../network/about'

const { useState, useEffect } = React

export default function useAbout() {
  const [aboutList, setAboutList] = useState([])
  const getAboutFromDB = async () => {
    const data = await _getAllAbout()
    setAboutList(data)
  }
  useEffect(() => {
    getAboutFromDB()
  }, [])
  return [aboutList, getAboutFromDB]
}
