import { ADD_TOASTS, CLEAR_TOASTS } from '../actions/types'

const initialState = {
  toastQueue: [],
};

export default (state = initialState, action = {}) => {

  switch (action.type) {
    case ADD_TOASTS:
      return {
        ...state,
        toastQueue: [...state.toastQueue, action.toast]
      };
      break;
    case CLEAR_TOASTS:
      return {
        ...state,
        toastQueue: [],
      };
      break;
    default:
      return state;
  }
  
};
