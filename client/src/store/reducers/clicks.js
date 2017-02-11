import * as ActionTypes from '../actionTypes';

import {initialClicksState} from './initialStates';

export const clicks = (state = initialClicksState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        clicks: action.payload.user.nbrClicks.clicks,
      };
    case ActionTypes.REQUEST_UPDATE_CLICK:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.RECIEVED_UPDATE_CLICK:
      return {
        isFetching: false,
        clicks: state.clicks + 1,
        error: null,
      };
    case ActionTypes.RECIEVED_RESET_CLICK:
      return {
        isFetching: false,
        clicks: 0,
        error: null,
      };
    case ActionTypes.ERROR_UPDATE_CLICK:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
