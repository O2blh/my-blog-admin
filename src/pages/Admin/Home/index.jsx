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
import { useArticle, useDrafts, useMsg, useSay } from '@/hooks'
import useFriendlink from '@/hooks/useFriendLink'

const Home = () => {
  const [articles] = useArticle()
  const [drafts] = useDrafts()
  const [friendLinks] = useFriendlink()
  const [msgs] = useMsg()
  const [says] = useSay()
  const statisticData = [
    {
      label: '文章数',
      number: articles.length,
      route: ROUTES.ARTICLES,
    },
    {
      label: '草稿数',
      number: drafts.length,
      route: ROUTES.DRAFTS,
    },
    {
      label: '友链数',
      number: friendLinks.length,
      route: ROUTES.FRIEND_LINK,
    },
    {
      label: '留言数',
      number: msgs.length,
      route: ROUTES.MSG,
    },
    {
      label: '说说',
      number: says.length,
      route: ROUTES.SAY,
    },
  ]
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
