import React from 'react'
import { db } from '../utils/cloudBase'

const { useState, useEffect } = React

export default function useArticles() {
  const [articles, setArticles] = useState([])
  const getArticleFromDB = () => {
    db.collection('article')
      .get()
      .then((res) => {
        console.log(res.data)
        setArticles(res.data)
      })
  }
  useEffect(() => {
    getArticleFromDB()
  }, [])
  return [articles, getArticleFromDB]
}
