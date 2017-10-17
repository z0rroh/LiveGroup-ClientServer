import axios from 'axios'
import { SET_CURRENT_USER, SET_ISFETCHING } from './types'


export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user,
  }
}

export function isFetching(isFetching){
  return {
    type: SET_ISFETCHING,
    isFetching,
  }
}
export function loginServer(data){
  return dispatch =>{
    dispatch(isFetching(true));
    console.log(data);
    return axios.post('/session/create',data)
    .then(res => {
      switch (res.data.code) {
        case "SUCCESS":
          dispatch(setCurrentUser(res.data.user));
          dispatch(isFetching(false));
          break;
        default:
          dispatch(isFetching(false));
          return res.data.message
          break;
      }
    })
    .catch(err =>{
      console.log(err);
      dispatch(isFetching(false));
    })
  }
}



export function logout(){
  return dispatch =>{
    return axios.get('/session/destroy')
    .then(res => {
      dispatch(setCurrentUser({}));
    })
    .catch(err =>{
      console.log(err);
    })
  }
}
