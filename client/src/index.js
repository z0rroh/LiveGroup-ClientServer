import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './containers/App';
import store from './store'
import registerServiceWorker from './registerServiceWorker';
import setAuthorizationToken from './setAuthorizationToken'
import {initializeSocket} from './io.js'

// Import Styles
import './css/normalize.css'
import './css/blueprint.css'
import './css/blueprint-datetime.css'
import './App.css';



if(localStorage.jwToken){
   // Si hay token, Setea el headers para peticiones axios
   setAuthorizationToken(localStorage.jwToken);
   // Si hay token, Inicializa la conexion socket si
   initializeSocket(localStorage.jwToken);
}

ReactDOM.render(<Provider store={store}>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </Provider>, document.getElementById('root'));

registerServiceWorker();
