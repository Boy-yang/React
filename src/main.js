import React from "react";
import ReactDOM from "react-dom";
import { routerReducer } from "react-router-redux";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import * as reducers from "./reducers";

import App from './components/App';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});
const store = createStore(reducer, compose(applyMiddleware(thunk, promise)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
