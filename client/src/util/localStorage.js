import store from '../store';

export const saveUser = (user) => {
  console.log('saving user, user:', user);
  localStorage.setItem('full-test-user', JSON.stringify(user));
};

export const saveToken = (token) => {
  localStorage.setItem('full-test-token', token);
};

export const updateUser = () => {
  const storedUser = localStorage.getItem('full-test-user');
  // parse user from stored string
  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (user) {
      localStorage.setItem('full-test-user', JSON.stringify({
        ...user,
        nbrClicks: {clicks: store.getState().clicks.clicks},
      }));
    }
  } else {
    console.err('No user found in local storage to update');
  }
};

export const getUser = () => {
  const storedUser = localStorage.getItem('full-test-user');
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};

export const getToken = () => (
  localStorage.getItem('full-test-token')
  );

export const deleteInfo = () => {
  localStorage.removeItem('full-test-user');
  localStorage.removeItem('full-test-token');
};
