import React from 'react'
import { _getAllWorks } from '../network/works'

const { useState, useEffect } = React

export default function useWorks() {
  const [worksList, setworksList] = useState([])
  const getWorksFromDB = async () => {
    const data = await _getAllWorks()
    setworksList(data)
  }

  useEffect(() => {
    getWorksFromDB()
  }, [])
  return [worksList, getWorksFromDB]
}
