import * as ActionTypes from '../actionTypes';

import {initialPollsState} from '../util/initialStates';

export const polls = (state = initialPollsState, action) => {
  switch (action.type) {
    case ActionTypes.LOGOUT:
      return initialPollsState;
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
        activePoll: {
          id: action.payload.poll._id,
          question: action.payload.poll.question,
          votes: action.payload.poll.votes,
          answers: action.payload.poll.answers,
          author: action.payload.poll.author,
          date: action.payload.poll.date,
          hasVoted: action.payload.poll.votes.find(e => e.user === action.payload.userId) || false,
        },
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
