import React, { Component, Suspense, lazy } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Spin } from "antd";
import { hot } from 'react-hot-loader/root'

const Home = lazy( () => import( "./Home/Home.js" ) );
const Life = lazy( () => import( "./Life/Life.js" ) );
const User = lazy( () => import( "./User/User.js" ) );
const Write = lazy( () => import( "./Write/Write.js" ) );
const Article = lazy( () => import( "./Article/Article.js" ) );
const Forget = lazy( () => import( "./Forget/Forget.js" ) );

import "../style/reset.scss";

class App extends Component {
  static get route() {
    return (
      <Suspense
        fallback={ <Spin className="loading" size="large" tip="Loading..." /> }
      >
        {
          [
            { path: "/", component: props => <Home { ...props } /> },
            { path: "/life", component: props => <Life { ...props } /> },
            { path: "/user", component: props => <User { ...props } /> },
            { path: "/write", component: props => <Write { ...props } /> },
            { path: "/article/:id", component: props => <Article { ...props } /> },
            { path: "/forget", component: props => <Forget { ...props } /> },  
          ].map( ( item, index ) => (
            <Route exact key={ index } { ...item } />
          ) )
        }
      </Suspense>
    );
  }
  render() {
    return (
      <HashRouter>
        <Switch>{ App.route }</Switch>
      </HashRouter>
    );
  }
}
export default hot( App );