import { ADD_TOASTS, CLEAR_TOASTS } from './types.js'

export function addToast(toast){
  return {
    type: ADD_TOASTS,
    toast
  }
}

export function clearToasts(){
  return{
    type: CLEAR_TOASTS,
  }
}
