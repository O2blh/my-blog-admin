import React from 'react'
import { _getFriendLink } from '../network/friendLink'

const { useState, useEffect } = React

export default function useFriendlink() {
  const [friendLinkList, setFriendLinkList] = useState([])
  const getFriendLinkFromDB = async () => {
    const data = await _getFriendLink()
    setFriendLinkList(data)
  }

  useEffect(() => {
    getFriendLinkFromDB()
  }, [])
  return [friendLinkList, getFriendLinkFromDB]
}
