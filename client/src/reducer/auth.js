import isEmpty from 'lodash/isEmpty'
import { SET_CURRENT_USER, SET_ISFETCHING, SET_TOKEN, SET_USER_ATTRIBUTE } from '../actions/types'

const initialState = {
  isAuthenticated: false,
  isFetching: true,
  token: "",
  user: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
              isAuthenticated: !isEmpty(action.user),
              user: action.user,
             })
        break;
    case SET_ISFETCHING:
        return Object.assign({},state,{
          isFetching: action.isFetching
        })
        break;
    case SET_TOKEN:
       return Object.assign({}, state, {
                token: action.token
              })
        break;
    case SET_USER_ATTRIBUTE:
        const updateUser = {
          ...state.user,
          [action.param]: action.value,
        }
        return Object.assign({}, state, {
          user: updateUser
        })
        break;
    default:
        return state;
  }
}
