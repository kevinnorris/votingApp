import {getUser, getToken} from '../../util/localStorage';
// for debugging
/* localStorage.removeItem('full-test-token');
localStorage.removeItem('full-test-user');*/

const user = getUser();

export const initialAuthState = {
  token: getToken(),
  user,
};

export const initialPollsState = {
  isFetching: false,
  polls: [],
  error: null,
  activePoll: {
    id: '',
    question: '',
    votes: [],
    answers: [],
    author: '',
    date: null,
    hasVoted: false,
  },
  activePage: 1,
  numOfPages: 1,
  sortByVotes: false,
  ascending: false,
};
