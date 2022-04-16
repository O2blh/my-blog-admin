import React, { Suspense, lazy } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Layout from '@/components/Layout'
import ROUTES from '@/constants/routes'

const Home = lazy(() => import(/* webpackChunkName: "home" */'./Home'))
const Articles = lazy(() => import(/* webpackChunkName: "articles" */'./Articles'))
const AddArticle = lazy(() => import(/* webpackChunkName: "addArticle" */'./AddArticle'))
const Gallery = lazy(() => import(/* webpackChunkName: "gallery" */'./Gallery'))
const AddGallery = lazy(() => import(/* webpackChunkName: "addGallery" */'./AddGallery'))
const Say = lazy(() => import(/* webpackChunkName: "say" */'./Say'))
const Msg = lazy(() => import(/* webpackChunkName: "msg" */'./Msg'))
const FriendLink = lazy(() => import(/* webpackChunkName: "friendLink" */'./FriendLink'))
const Works = lazy(() => import(/* webpackChunkName: "works" */'./Works'))
const About = lazy(() => import(/* webpackChunkName: "about" */'./About'))
const AboutEdit = lazy(() => import(/* webpackChunkName: "aboutEdit" */'./AboutEdit'))
const WebSiteLogs = lazy(() => import(/* webpackChunkName: "webSiteLogs" */'./WebSiteLogs'))
const Drafts = lazy(() => import(/* webpackChunkName: "drafts" */'./Drafts'))

const Admin = () => {

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
