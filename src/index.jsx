import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faUserCircle)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
