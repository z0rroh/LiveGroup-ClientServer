import axios from 'axios'
import { SET_CURRENT_USER, SET_ISFETCHING, SET_TOKEN, SET_USER_ATTRIBUTE } from './types'
import setAuthorizationToken from '../setAuthorizationToken.js'
import {initializeSocket} from '../io.js'

  export function setCurrentUser(user){
    return {
      type: SET_CURRENT_USER,
      user,
    }
  }

  export function setUserAttribute(param, value){
    return {
      type: SET_USER_ATTRIBUTE,
      param,
      value
    }
  }

  export function setIsFetching(isFetching){
    return {
      type: SET_ISFETCHING,
      isFetching,
    }
  }

  export function setToken(token){
    return {
      type: SET_TOKEN,
      token,
    }
  }

  export function loginServer(data){
    return dispatch =>{
      dispatch(setIsFetching(true));
      return axios.post('/session/signIn',data)
      .then((res)=> {
        const auth = res.data;
        switch (auth.code) {
          case "SUCCESS":
            const authToken = new Promise((resolve, reject)=>{
               localStorage.setItem('jwToken',auth.token);
               initializeSocket(auth.token)
               setAuthorizationToken(auth.token);
               resolve("GOOD")
            })
            authToken
            .then(res=>{
              console.log(res);
              dispatch(setToken(auth.token));
              dispatch(setCurrentUser(auth.user));
              dispatch(setIsFetching(false));
            })
            break;
          default:
            dispatch(setIsFetching(false));
            return res.data.message
        }
      })
      .catch(err =>{
        console.log(err);
        dispatch(setIsFetching(false));
      })
    }
  }

  export function loginFacebook(token){
    return dispatch => {
      dispatch(setIsFetching(true));
      return axios.post('/session/facebook', {access_token: token})
      .then((res)=> {
        const auth = res.data;
        switch (auth.code) {
          case "SUCCESS":
            const authToken = new Promise((resolve, reject)=>{
               localStorage.setItem('jwToken',auth.token);
               initializeSocket(auth.token)
               setAuthorizationToken(auth.token);
               resolve("GOOD")
            })
            authToken
            .then(res=>{
              console.log(res);
              dispatch(setToken(auth.token));
              dispatch(setCurrentUser(auth.user));
              dispatch(setIsFetching(false));
            })
            break;
          default:
            dispatch(setIsFetching(false));
            return res.data.message
        }
      })
      .catch(err =>{
        console.log(err);
      })
    }
  }


  export const SignupServer = data => {
    return dispatch => {
      return axios.post(`/session/signUp`, data)
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
                //dispatch(setCurrentUser(res.data.user[0]));
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
          console.log("crear grupo",res);
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
      return axios.post(`/session/logout`)
        .then((res)=>{
          localStorage.clear();
          dispatch(setCurrentUser({}));
          dispatch(setToken(''));
          dispatch(setIsFetching(false))
          setAuthorizationToken(false);
        })
    }
  }
