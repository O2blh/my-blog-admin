import React from 'react'
import { _getsay } from '../network/say'

const { useState, useEffect } = React

export default function useSay() {
  const [sayList, setSayList] = useState([])
  const getSayFromDB = async () => {
    const res = await _getsay()
    setSayList(res)
  }

  useEffect(() => {
    getSayFromDB()
  }, [])
  return [sayList, getSayFromDB]
}
