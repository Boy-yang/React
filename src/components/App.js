import React, { Component, Suspense, lazy } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Spin } from "antd";
import { hot } from 'react-hot-loader/root'

const Home = lazy( () => import( "./Home/Home.js" ) );
const Shop = lazy( () => import( "./Shop/Shop.js" ) );
const User = lazy( () => import( "./User/User.js" ) );
const Detail = lazy( () => import( "./Detail/Detail.js" ) );
const Login = lazy( () => import( "./Login/Login.js" ) );
const Register = lazy( () => import( "./Register/Register.js" ) );
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
            { path: "/shop", component: props => <Shop { ...props } /> },
            { path: "/user", component: props => <User { ...props } /> },
            { path: "/detail/:id", component: props => <Detail { ...props } /> },
            { path: "/forget", component: props => <Forget { ...props } /> },
            { path: "/login", component: props => <Login { ...props } /> },
            { path: "/register", component: props => <Register { ...props } /> },   
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