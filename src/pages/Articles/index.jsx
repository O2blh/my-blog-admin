import React, { useState } from 'react'
import ArticleTabel from './ArticleTable'
import SearchBox from './SearchBox'

import { useClassify, useTags, useArticles } from '../../hooks'

import './style.css'

// const articles = [
//   {
//     id: '1',
//     title: 'test',
//     publishDate: '2022-03-22 14:54',
//     classify: '工程化',
//     tags: ['Webpack', 'React'],
//     url: 'https://www.baidu.com',
//   },
//   {
//     id: '1',
//     title: 'blh',
//     publishDate: '2022-03-22 14:54',
//     classify: 'React',
//     tags: ['Webpack', 'JavaScript'],
//     url: 'https://www.baidu.com',
//   },
// ]

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
