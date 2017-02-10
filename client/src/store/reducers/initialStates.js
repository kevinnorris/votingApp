localStorage.removeItem('full-test-token');
localStorage.removeItem('full-test-user');
const storedUser = localStorage.getItem('full-test-user');
// parse user from stored string
let user;
try {
  user = JSON.parse(storedUser);
} catch (e) {
  console.error('Error parsing user data', e);
}

export const initialAuthState = {
  token: localStorage.getItem('full-test-token'),
  user,
};

export const initialClicksState = {
  isFetching: false,
  clicks: storedUser ? user.nbrClicks.clicks : 0,
  error: null,
};
