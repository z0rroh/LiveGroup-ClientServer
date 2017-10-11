import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './containers/App';
import store from './store'
import registerServiceWorker from './registerServiceWorker';
//import socketIOClient from 'socket.io-client'
//import sailsIOClient from 'sails.io.js'

// Import Styles
import './css/normalize.css'
import './css/blueprint.css'
import './css/blueprint-datetime.css'
import './App.css';

//const io = sailsIOClient(socketIOClient);
// Tell socket.io where the server is
//io.sails.url = 'http://localhost:1337';


ReactDOM.render(<Provider store={store}>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </Provider>, document.getElementById('root'));

registerServiceWorker();
