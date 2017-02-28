import * as ActionTypes from '../actionTypes';

import {initialAuthState} from '../util/initialStates';

export const auth = (state = initialAuthState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.UPDATE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        user: action.payload.user,
      };
    case ActionTypes.LOGOUT:
      return initialAuthState;
    default:
      return state;
  }
};
