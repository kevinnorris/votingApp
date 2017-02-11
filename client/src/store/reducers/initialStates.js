import {getUser, getToken} from '../../util/localStorage';
// for debugging
/* localStorage.removeItem('full-test-token');
localStorage.removeItem('full-test-user');*/

const user = getUser();

export const initialAuthState = {
  token: getToken(),
  user,
};

export const initialClicksState = {
  isFetching: false,
  clicks: user ? user.nbrClicks.clicks : 0,
  error: null,
};
