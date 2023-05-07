import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import userReducer from './reducers/userReducer'
import postReducer from './reducers/postReducer'
import usersReducer from "./reducers/usersReducer";

const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  post: postReducer,
})

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
