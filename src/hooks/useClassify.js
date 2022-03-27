import React from 'react'
import { _getClassifies } from '../network/classify'

const { useState, useEffect } = React

export default function useClassify() {
  const [classify, setClassify] = useState([])
  const getClassifyFromDB = () => {
    const data = _getClassifies()
    setClassify(data)
  }
  useEffect(() => {
    getClassifyFromDB()
  }, [])
  return [classify, getClassifyFromDB]
}
