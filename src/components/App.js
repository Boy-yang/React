import React, { Component, Suspense, lazy } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Spin } from "antd";
import { hot } from 'react-hot-loader/root'

const Login = lazy( () => import( "./Login/Login.js" ) );
const Register = lazy( () => import( "./Register/Register.js" ) );

import "../style/reset.scss";

class App extends Component {
  static get route() {
    return (
      <Suspense
        fallback={ <Spin className="loading" size="large" tip="Loading..." /> }
      >
        {
          [
            { path: "/", component: props => <Login { ...props } /> },
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