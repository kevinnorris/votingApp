import store from '../store';

export const requireAuth = (nextState, replace, callback) => {
  if (!store.getState().auth.token) {
    replace('/login');
  }
  callback();
};
