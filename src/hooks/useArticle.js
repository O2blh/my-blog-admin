import React from 'react'
import { _getArtilces } from '../network/article'

const { useState, useEffect } = React

export default function useArticle() {
  const [articleList, setArticleList] = useState([])
  const getArticleFromDB = async () => {
    const data = await _getArtilces()
    setArticleList(data)
  }
  useEffect(() => {
    getArticleFromDB()
  }, [])
  return [articleList, getArticleFromDB]
}
