import React from 'react'
import { _getsays } from '../network/say'

const { useState, useEffect } = React

export default function useSay() {
  const [sayList, setSayList] = useState([])
  const getSayFromDB = async () => {
    const res = await _getsays()
    setSayList(res.data)
  }

  useEffect(() => {
    getSayFromDB()
  }, [])
  return [sayList, getSayFromDB]
}
