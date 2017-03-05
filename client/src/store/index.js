import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

import rootReducer from './rootReducer';

const middleware = routerMiddleware(browserHistory);
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Enables redux extensions to view state

const store = createStore(
  rootReducer,
  //composeEnhancers(
    applyMiddleware(middleware),
    applyMiddleware(thunk),
  //),
);

export default store;
