import 'babel-polyfill';
import 'es6-promise/auto';
import 'isomorphic-fetch';

import 'normalize.css';
import 'moment/locale/ru';
import moment from 'moment';
moment.locale('ru');
import { render } from 'react-dom';
import React from 'react';

import Chat from './containers/Chat';

render(<Chat/>, document.getElementById('root'));
