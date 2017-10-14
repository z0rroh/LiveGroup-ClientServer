import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
import Toast from './Toast'
//import { routerReducer as routing } from 'react-router-redux';
import Rehydrate from './Rehydrate'

const rootReducer = combineReducers({
  form: formReducer,
  auth,
  Toast
});

export default rootReducer;
