import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './serviceWorker';

import './index.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { faUserCircle,faTrashAlt,faCubes,faFileAlt, faAngleRight, faAngleLeft,faFileUpload,faCheckCircle,faExclamationCircle} from '@fortawesome/free-solid-svg-icons'

import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons'


library.add(fab, faUserCircle, faTrashAlt, faCubes, faFileAlt, faSquare, faCheckSquare, faAngleRight, faAngleLeft,faFileUpload,faCheckCircle,faExclamationCircle)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
