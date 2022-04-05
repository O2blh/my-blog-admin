import React, { Suspense, lazy } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Layout from '@/components/Layout'
import ROUTES from '@/constants/routes'
// import { _getArtilces } from '@/network/article'
// import { ACTIONS as ARTICLE_ACTIONS } from '@/redux/reducers/articlesState'
// import { _getAllDrafts } from '@/network/drafts'
// import { ACTIONS as DRAFT_ACTIONS } from '@/redux/reducers/draftsState'
// import { _getAllTag } from '@/network/tag'
// import { ACTIONS as TAG_ACTIONS } from '@/redux/reducers/tagState'
// import { _getClassifies } from '@/network/classify'
// import { ACTIONS as CLASSIFY_ACTIONS } from '@/redux/reducers/classifyState'
// import { _getsays } from '@/network/say'
// import { ACTIONS as SAY_ACTIONS } from '@/redux/reducers/sayState'
// import { _getFriendLinks } from '@/network/friendLink'
// import { ACTIONS as LINK_ACTIONS } from '@/redux/reducers/linkState'
// import { _getmsgs } from '@/network/msg'
// import { ACTIONS as MSG_ACTIONS } from '@/redux/reducers/msgState'
// import { useDispatch } from 'react-redux'

const Home = lazy(() => import('./Home'))
const Articles = lazy(() => import('./Articles'))
const AddArticle = lazy(() => import('./AddArticle'))
const Gallery = lazy(() => import('./Gallery'))
const AddGallery = lazy(() => import('./AddGallery'))
const Say = lazy(() => import('./Say'))
const Msg = lazy(() => import('./Msg'))
const FriendLink = lazy(() => import('./FriendLink'))
const Works = lazy(() => import('./Works'))
const About = lazy(() => import('./About'))
const AboutEdit = lazy(() => import('./AboutEdit'))
const WebSiteLogs = lazy(() => import('./WebSiteLogs'))
const Drafts = lazy(() => import('./Drafts'))

const Admin = () => {
  // const dispatch = useDispatch()
  // const getArticlesFromDb = async () => {
  //   const articles = await _getArtilces()
  //   dispatch({
  //     type: ARTICLE_ACTIONS.GET_ARTICLES,
  //     payload: articles,
  //   })
  // }
  // const getDraftsFromDb = async () => {
  //   const drafts = await _getAllDrafts()
  //   dispatch({
  //     type: DRAFT_ACTIONS.GET_DRAFTS,
  //     payload: drafts,
  //   })
  // }
  // const getTagsFromDb = async () => {
  //   const tags = await _getAllTag()
  //   dispatch({
  //     type: TAG_ACTIONS.GET_TAGS,
  //     payload: tags,
  //   })
  // }
  // const getClassifiesFromDb = async () => {
  //   const classifies = await _getClassifies()
  //   dispatch({
  //     type: CLASSIFY_ACTIONS.GET_CLASSIFIES,
  //     payload: classifies,
  //   })
  // }

  // const getSaysFromDb = async () => {
  //   const says = await _getsays()
  //   dispatch({
  //     type: SAY_ACTIONS.GET_SAYS,
  //     payload: says,
  //   })
  // }

  // const getFriendLinksFromDb = async () => {
  //   const friendLinks = await _getFriendLinks()
  //   dispatch({
  //     type: LINK_ACTIONS.GET_FRIEND_LINKS,
  //     payload: friendLinks,
  //   })
  // }

  // const getMsgsFromDb = async () => {
  //   const msgs = await _getmsgs()
  //   dispatch({
  //     type: MSG_ACTIONS.GET_MSGS,
  //     payload: msgs,
  //   })
  // }

  // useEffect(() => {
  //   getArticlesFromDb()
  //   getDraftsFromDb()
  //   getTagsFromDb()
  //   getClassifiesFromDb()
  //   getSaysFromDb()
  //   getFriendLinksFromDb()
  //   getMsgsFromDb()
  // }, [])

  return (
    <Layout>
      <Suspense fallback={null}>
        <Switch>
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.ARTICLES} component={Articles} />
          <Route path={ROUTES.ADD_ARTICLE} component={AddArticle} />
          <Route path={ROUTES.GALLERY} component={Gallery} />
          <Route path={ROUTES.ADD_GALLERY} component={AddGallery} />
          <Route path={ROUTES.SAY} component={Say} />
          <Route path={ROUTES.MSG} component={Msg} />
          <Route path={ROUTES.FRIEND_LINK} component={FriendLink} />
          <Route path={ROUTES.WORKS} component={Works} />
          <Route path={ROUTES.ABOUT} component={About} />
          <Route path={ROUTES.ABOUT_EDIT} component={AboutEdit} />
          <Route path={ROUTES.WEBSITE_LOGS} component={WebSiteLogs} />
          <Route path={ROUTES.DRAFTS} component={Drafts} />
          <Redirect to={ROUTES.DEFAULT} />
        </Switch>
      </Suspense>
    </Layout>
  )
}

export default Admin
