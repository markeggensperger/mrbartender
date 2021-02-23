import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import cocktailReducer from './cocktails';
import tagReducer from './tags';
import selectionReducer from './selections';

const appReducer = combineReducers({
  cocktails: cocktailReducer,
  tags: tagReducer,
  selections: selectionReducer,
});

const middleware = [
  // `withExtraArgument` gives us access to axios in our async action creators!
  // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
  thunkMiddleware.withExtraArgument({ axios }),
  createLogger({ collapsed: true }),
];

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;