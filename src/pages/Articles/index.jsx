import React, { useState } from 'react'
import ArticleTabel from './ArticleTable'
import SearchBox from './SearchBox'

import { useClassify, useTags, useArticles } from '../../hooks'

import './style.css'

const Articles = () => {
  const [classify] = useClassify()
  const [tagList] = useTags()
  const [articles] = useArticles()
  const [articlesShow, setArtilesShow] = useState(articles)
  return (
    <>
      <SearchBox
        articles={articles}
        setArtilesShow={setArtilesShow}
        classifies={classify}
        tags={tagList}
      />
      <ArticleTabel articlesShow={articlesShow} />
    </>
  )
}

export default Articles
