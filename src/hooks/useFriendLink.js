import React from 'react'
import { db } from '../network/cloudBase'

const { useState, useEffect } = React

export default function useFriendlink() {
  const [friendLinkList, setFriendLinkList] = useState([])
  const getFriendLinkFromDB = () => {
    db.collection('friendLink')
      .get()
      .then((res) => {
        setFriendLinkList(res.data)
      })
  }

  useEffect(() => {
    getFriendLinkFromDB()
  }, [])
  return [friendLinkList, getFriendLinkFromDB]
}
