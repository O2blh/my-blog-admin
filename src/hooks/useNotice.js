import React from 'react'
import { _getNotice } from '../network/notice'

const { useState, useEffect } = React

export default function useNotice() {
  const [Notice, setNotice] = useState('')
  const getNoticeFromDB = async () => {
    const res = await _getNotice()
    if (res && res.length > 0) {
      setNotice(res[0].notice)
    }
  }
  useEffect(() => {
    getNoticeFromDB()
  }, [])
  return [Notice, getNoticeFromDB]
}
