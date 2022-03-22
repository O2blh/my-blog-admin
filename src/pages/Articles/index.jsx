import React, { useState } from 'react'
import ArticleTabel from './ArticleTable'
import SearchBox from './SearchBox'

import './style.css'

const classifies = ['React', 'Html', '工程化']

const tags = ['React', 'Webpack', 'JavaScript']

const articles = [
  {
    id: '1',
    title: 'test',
    publishDate: '2022-03-22 14:54',
    classify: '工程化',
    tags: ['Webpack', 'React'],
    url: 'https://www.baidu.com',
  },
  {
    id: '1',
    title: 'blh',
    publishDate: '2022-03-22 14:54',
    classify: 'React',
    tags: ['Webpack', 'JavaScript'],
    url: 'https://www.baidu.com',
  },
]

const Articles = () => {
  const [articlesShow, setArtilesShow] = useState(articles)

  return (
    <>
      <SearchBox
        articles={articles}
        setArtilesShow={setArtilesShow}
        classifies={classifies}
        tags={tags}
      />
      <ArticleTabel articlesShow={articlesShow} />
    </>
  )
}

export default Articles
