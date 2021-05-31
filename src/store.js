import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createHistory from 'history/createBrowserHistory';
import thunk from "redux-thunk";
import authReducer from './reducers/AuthReducer';

export const history = createHistory();

export const store = createStore(
  authReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
