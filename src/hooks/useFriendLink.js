import React from 'react'
import { _getFriendLinks } from '../network/friendLink'

const { useState, useEffect } = React

export default function useFriendlink() {
  const [friendLinkList, setFriendLinkList] = useState([])
  const getFriendLinkFromDB = async () => {
    const data = await _getFriendLinks()
    setFriendLinkList(data)
  }

  useEffect(() => {
    getFriendLinkFromDB()
  }, [])
  return [friendLinkList, getFriendLinkFromDB]
}
