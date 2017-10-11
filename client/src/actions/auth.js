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
    return axios.post('http://localhost:1337/session/create',data)
    .then(res => {
      console.log(res);
      dispatch(setCurrentUser(res.data));
      dispatch(isFetching(false));
    })
    .catch(err =>{
      console.log(err);
      dispatch(isFetching(false));
    })
  }
}



export function logout(){
  return dispatch => {
    dispatch(setCurrentUser({}));
  }
}
