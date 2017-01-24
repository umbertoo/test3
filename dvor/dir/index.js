import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './storeConfig';
import {Router, browserHistory} from 'react-router';
import {Routes} from './router';
import {syncHistoryWithStore} from 'react-router-redux';

import './assets/css/normalize.css';
import './assets/css/bulma.css';
import './assets/css/icons.css';
import './assets/css/style.css';
import './assets/css/atom.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}
            routes={Routes}
    />
  </Provider>,
  document.getElementById('root')
);
