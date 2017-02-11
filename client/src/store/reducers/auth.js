import * as ActionTypes from '../actionTypes';

import {initialAuthState} from './initialStates';

export const auth = (state = initialAuthState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ActionTypes.LOGIN_SUCCESS:
      const {nbrClicks, ...rest} = action.payload.user; // remove nbrClicks from user
      return {
        token: action.payload.token,
        user: rest,
      };
    case ActionTypes.LOGOUT:
      return initialAuthState;
    default:
      return state;
  }
};
