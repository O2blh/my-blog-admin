import React from 'react'
import Welcome from './Welcome'
import Infor from './Infor'
import Notice from './Notice'
import Cards from './Cards'
import ArticleOverView from './ArticleOverView'
import Classify from './Classify'
import Tags from './Tags'
import ROUTES from '@/constants/routes'

import './style.css'

const statisticData = [
  {
    label: '文章数',
    number: 147,
    route: ROUTES.ARTICLES,
  },
  {
    label: '草稿数',
    number: 147,
    route: ROUTES.DRAFTS,
  },
  {
    label: '友链数',
    number: 147,
    route: ROUTES.FRIEND_LINK,
  },
  {
    label: '留言数',
    number: 147,
    route: ROUTES.MSG,
  },
  {
    label: '说说',
    number: 147,
    route: ROUTES.SAY,
  },
]

const Home = () => {
  return (
    <>
      <div className="outlineBox">
        <Welcome />
        <Infor />
        <Notice />
      </div>
      <div className="statisticRegion">
        <Cards statisticData={statisticData} />
      </div>
      <div className="chart-class-tag">
        <ArticleOverView />
        <Classify />
        <Tags />
      </div>
    </>
  )
}

export default Home
