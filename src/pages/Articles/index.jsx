import React, { useEffect, useState } from 'react'
import ArticleTabel from './ArticleTable'
import SearchBox from './SearchBox'

import { useClassify, useTags, useArticles } from '../../hooks'

import './style.css'

const Articles = () => {
  const [classify] = useClassify()
  const [tagList] = useTags()
  const [articles, getArticleFromDB] = useArticles()
  const [articlesShow, setArtilesShow] = useState(articles)
  useEffect(() => {
    setArtilesShow(articles)
  }, [articles])
  return (
    <>
      <SearchBox
        articles={articles}
        setArtilesShow={setArtilesShow}
        classifies={classify}
        tags={tagList}
      />
      <ArticleTabel
        articlesShow={articlesShow}
        getArticleFromDB={getArticleFromDB}
      />
    </>
  )
}

export default Articles
