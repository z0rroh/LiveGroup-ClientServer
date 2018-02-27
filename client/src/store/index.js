import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducer'
import {persistStore, autoRehydrate} from 'redux-persist'


const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  undefined,
  compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware),
    autoRehydrate()
  ),
);
persistStore(store,{whitelist: ['auth']},() => {
  //console.log('rehydration complete')
})


export default store;
