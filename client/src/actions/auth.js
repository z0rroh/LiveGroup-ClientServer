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
