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
      }
    })
    .catch(err =>{
      console.log(err);
      dispatch(isFetching(false));
    })
  }
}


export const SignupServer = data => {
  return dispatch => {
    return axios.post(`/newAccount`, data)
      .then( res => {
        //dispatch(setCurrentUser(res.data.user))
        return res.data;
      })
      .catch( err => {
        console.log(err.response);
      })
  }
}

export function editAvatar(avatar, config){
    return dispatch =>{
      return axios.post("/archivo/upload", avatar, config)
      .then(res =>{
        switch (res.data.code) {
            case "SUCCESS":
              dispatch(setCurrentUser(res.data.user[0]));
              break;
            default:
              return res.data.message
          }
      })
    }
}

export function newGroup(group){
    return dispatch =>{
      return axios.post('/crear/grupo',{group: group})
      .then((res)=>{
        console.log(res);
        switch (res.data.code) {
            case "SUCCESS":
              dispatch(setCurrentUser(res.data.user));
              break;
            default:
              return res.data.message
          }
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
