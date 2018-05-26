import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducer'
import {persistStore, autoRehydrate} from 'redux-persist'


const loggerMiddleware = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
}

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
