import { useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import AddArticle from "./pages/AddArticle";
import Pic from "./pages/Pic";
import Say from "./pages/Say";
import Msg from "./pages/Msg";
import FriendLink from "./pages/FriendLink";
import Works from "./pages/Works";
import About from "./pages/About";
import WebSiteLogs from "./pages/WebSiteLogs";
import Drafts from "./pages/Drafts";
import Login from "./pages/Login";
import ROUTES from "./constants/routes";

import { useSelector } from "react-redux";

function App() {
  const loginState = useSelector((state) => state.LoginState);
  return loginState ? (
    <Layout>
      <Switch>
        <Route exact path={ROUTES.ROOT} component={Home} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.ARTICLES} component={Articles} />
        <Route path={ROUTES.ADD_ARTICLE} component={AddArticle} />
        <Route path={ROUTES.PIC} component={Pic} />
        <Route path={ROUTES.SAY} component={Say} />
        <Route path={ROUTES.MSG} component={Msg} />
        <Route path={ROUTES.FRIEND_LINK} component={FriendLink} />
        <Route path={ROUTES.WORKS} component={Works} />
        <Route path={ROUTES.ABOUT} component={About} />
        <Route path={ROUTES.WEBSITE_LOGS} component={WebSiteLogs} />
        <Route path={ROUTES.DRAFTS} component={Drafts} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Redirect to={ROUTES.DEFAULT} />
      </Switch>
    </Layout>
  ) : (
    <Login />
  );
}

export default App;
