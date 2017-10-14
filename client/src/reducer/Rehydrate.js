import {REHYDRATE} from 'redux-persist/constants'



export default (state, action = {}) => {
  switch (action.type) {
    case REHYDRATE:
        var incoming = action.payload.auth
        if (incoming){
          Object.assign({}, state, {
            isAuthenticated: incoming.isAuthenticated,
            isFetching: incoming.isFetching,
            user: incoming.user
          })
        }
        break;

    default:
        return state;
  }
}
