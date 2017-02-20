import * as ActionTypes from '../actionTypes';

import {initialPollsState} from '../util/initialStates';

export const polls = (state = initialPollsState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_POLLS:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case ActionTypes.ERROR_POLLS:
      return {
        ...state,
        isFetching: false,
        error: {...action.payload.error, location: action.payload.location},
      };
    case ActionTypes.RECIEVED_POLLS:
      return {
        ...state,
        error: null,
        isFetching: false,
        polls: action.payload.polls,
      };
    case ActionTypes.SET_ACTIVE_POLL:
      return {
        ...state,
        activePoll: action.payload.pollId,
      };
    default:
      return state;
  }
};
