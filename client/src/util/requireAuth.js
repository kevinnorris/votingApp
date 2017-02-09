import store from '../store';

export const requireAuth = (nextState, replace, callback) => {
  if (!store.getState().auth.token) {
  // localStorage.removeItem('full-test-token');
    replace('/login');
  }
  callback();
};
