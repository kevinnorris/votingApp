import * as ActionTypes from '../actionTypes';

import {initialPollsState} from '../util/initialStates';

const calcData = (votes, answers) => {
  // Initialize data array to size of answers with value 0 for all elements
  const data = new Array(answers.length);
  for (let i = 0; i < answers.length; i++) {
    data[i] = 0;
  }
  // sum num of times each answer has been voted fore
  for (let j = 0; j < votes.length; j++) {
    data[answers.indexOf(votes[j].answer)] += 1;
  }

  return data;
};

export const polls = (state = initialPollsState, action) => {
  switch (action.type) {
    case ActionTypes.LOGOUT:
      return initialPollsState;
    case ActionTypes.REQUEST_POLLS:
      return {
        ...state,
        isFetching: true,
        error: null,
        activePoll: {
          ...state.activePoll,
          hasVoted: null,
        },
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
          authorId: action.payload.poll.authorId,
          authorName: action.payload.poll.authorName,
          date: action.payload.poll.date,
          hasVoted: action.payload.poll.votes.find(e => e.user === action.payload.userId) || false,
          data: calcData(action.payload.poll.votes, action.payload.poll.answers),
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
