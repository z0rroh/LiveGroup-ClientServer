import isEmpty from 'lodash/isEmpty'
import { SET_CURRENT_USER, SET_ISFETCHING, SET_TOKEN } from '../actions/types'

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
    case SET_ISFETCHING:
        return Object.assign({},state,{
          isFetching: action.isFetching
        })

    case SET_TOKEN:
       return Object.assign({}, state, {
                token: action.token
              })
    default:
        return state;
  }
}
