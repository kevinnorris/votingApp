import store from '../store';

export const saveUser = () => {
  const storedUser = localStorage.getItem('full-test-user');
  // parse user from stored string
  let user;
  try {
    user = JSON.parse(storedUser);
  } catch (e) {
    console.error('Error parsing user data', e);
  }

  if (user) {
    localStorage.setItem('full-test-user', JSON.stringify({
      ...user,
      nbrClicks: {clicks: store.getState().clicks.clicks},
    }));
  }
};

