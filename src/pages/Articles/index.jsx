import React, { useEffect, useState } from 'react'
import ArticleTable from './ArticleTable'
import SearchBox from './SearchBox'

import { useClassify, useTag, useArticles } from '../../hooks'

import './style.css'

const Articles = () => {
  const [classify] = useClassify()
  const [tagList] = useTag()
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
      <ArticleTable
        articlesShow={articlesShow}
        getArticleFromDB={getArticleFromDB}
      />
    </>
  )
}

export default Articles
