import {getUser, getToken} from '../../util/localStorage';
// for debugging
/* localStorage.removeItem('full-test-token');
localStorage.removeItem('full-test-user');*/

const user = getUser();
console.log('user: ', user);

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
    authorId: '',
    authorName: '',
    date: null,
    hasVoted: false,
    data: [],
  },
  activePage: 1,
  numOfPages: 1,
  sortByVotes: false,
  ascending: false,
};
