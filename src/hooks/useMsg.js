import React from 'react'
import { _getmsg } from '../network/msg'

const { useState, useEffect } = React

export default function useMsg() {
  const [msgList, setMsgList] = useState([])
  const getMsgFromDB = async () => {
    const res = await _getmsg()
    setMsgList(res.data)
  }

  useEffect(() => {
    getMsgFromDB()
  }, [])
  return [msgList, getMsgFromDB]
}
