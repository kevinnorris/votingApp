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
      localStorage.setItem('full-test-token', action.payload.token);
      localStorage.setItem('full-test-user', JSON.stringify(action.payload.user));
      const {nbrClicks, ...rest} = action.payload.user; // remove nbrClicks from user
      return {
        token: action.payload.token,
        user: rest,
      };
    default:
      return state;
  }
};
