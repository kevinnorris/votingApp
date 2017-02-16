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
};

export const initialUIState = {
  orderByVotes: false,
  activePoll: null,
};
