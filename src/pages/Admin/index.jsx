import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from './Home'
import Articles from './Articles'
import AddArticle from './AddArticle'
import Gallery from './Gallery'
import AddGallery from './AddGallery'
import Say from './Say'
import Msg from './Msg'
import FriendLink from './FriendLink'
import Works from './Works'
import About from './About'
import WebSiteLogs from './WebSiteLogs'
import Drafts from './Drafts'
import ROUTES from '@/constants/routes'

const Admin = () => {
  return (
    <Layout>
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
    </Layout>
  )
}

export default Admin
