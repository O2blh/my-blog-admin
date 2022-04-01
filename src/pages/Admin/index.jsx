import React, { Suspense, lazy } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Layout from '@/components/Layout'
import ROUTES from '@/constants/routes'

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
const WebSiteLogs = lazy(() => import('./WebSiteLogs'))
const Drafts = lazy(() => import('./Drafts'))

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
          <Route path={ROUTES.WEBSITE_LOGS} component={WebSiteLogs} />
          <Route path={ROUTES.DRAFTS} component={Drafts} />
          <Redirect to={ROUTES.DEFAULT} />
        </Switch>
      </Suspense>
    </Layout>
  )
}

export default Admin
