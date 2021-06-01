import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createHistory from 'history/createBrowserHistory';
import thunk from "redux-thunk";
import reducer from './reducers';

export const history = createHistory();

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
