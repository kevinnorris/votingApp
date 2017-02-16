import * as ActionTypes from '../actionTypes';

import {initialUIState} from '../util/initialStates';

export const ui = (state = initialUIState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
