import React from 'react'
import { _getSiteLog } from '../network/siteLog'

const { useState, useEffect } = React

export default function useSiteLog() {
  const [siteLogList, setSiteLogList] = useState([])
  const getsiteLogsFromDB = async () => {
    const data = await _getSiteLog()
    setSiteLogList(data)
  }

  useEffect(() => {
    getsiteLogsFromDB()
  }, [])
  return [siteLogList, getsiteLogsFromDB]
}
