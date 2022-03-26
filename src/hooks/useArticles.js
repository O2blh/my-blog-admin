import React from 'react'
import { _getArtilces } from '../network/article'

const { useState, useEffect } = React

export default function useArticles() {
  const [articles, setArticles] = useState([])
  const getArticleFromDB = async () => {
    const data = await _getArtilces()
    setArticles(data)
  }
  useEffect(() => {
    getArticleFromDB()
  }, [])
  return [articles, getArticleFromDB]
}
