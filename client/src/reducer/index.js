import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'
//import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  form: formReducer,
  auth,
});

export default rootReducer;
