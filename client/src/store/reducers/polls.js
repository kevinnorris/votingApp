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
        numOfPages: action.payload.numOfPages,
      };
    case ActionTypes.SET_ACTIVE_POLL:
      return {
        ...state,
        activePoll: action.payload.pollId,
      };
    case ActionTypes.SET_ASCENDING:
      return {
        ...state,
        ascending: action.payload.ascending,
      };
    case ActionTypes.SET_SORT:
      return {
        ...state,
        sortByVotes: action.payload.sortByVotes,
      };
    case ActionTypes.SET_PAGE:
      return {
        ...state,
        activePage: action.payload.activePage,
      };
    default:
      return state;
  }
};
