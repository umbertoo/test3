import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/root';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import fetchMiddlewareCreator from 'redux-fetch-middleware';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';



export const globalFetchOptions = {
  suffix: ['REQUEST', 'SUCCESS', 'FAILURE'],
  fetchOptions: {
    method: 'GET',
    type: 'json',
    credentials: 'same-origin',
    //mode: 'no-cors',
    headers: {
      //'Accept': 'application/json',
      'Content-Type': 'text/plain',
      //'Access-Control-Request-Method': 'POST',
      //'Access-Control-Allow-Credentials': 'true',
      //'Access-Control-Allow-Origin': '*',
    },
  },
};

const browserHistoryMiddleware = routerMiddleware(browserHistory);
const fetch = fetchMiddlewareCreator(globalFetchOptions);


export default function configureStore(initialState) {

  const store = createStore(rootReducer, initialState,
    composeWithDevTools(
      applyMiddleware(
        thunk, browserHistoryMiddleware, fetch
      ),
    )
  );

  if (module.hot) {
    module.hot.accept('./reducers/root', () => {
      const nextRootReducer = require('./reducers/root').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
