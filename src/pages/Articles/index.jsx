import React, { useEffect, useState } from 'react'
import ArticleTable from './ArticleTable'
import SearchBox from './SearchBox'

import { useClassify, useTag, useArticle } from '../../hooks'

import './style.css'

const Articles = () => {
  const [classify] = useClassify()
  const [tagList] = useTag()
  const [articles, getArticleFromDB] = useArticle()
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
