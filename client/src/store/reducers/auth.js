import * as ActionTypes from '../actionTypes';

const storedUser = localStorage.getItem('full-test-user');
// parse user from stored string
let user;
try {
  user = JSON.parse(storedUser);
} catch (e) {
  console.error('Error parsing user data', e);
}

const initialState = {
  token: localStorage.getItem('full-test-token'),
  user,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('full-test-token', action.payload.token);
      localStorage.setItem('full-test-user', JSON.stringify(action.payload.user));
      const {nbrClicks, ...rest} = action.payload.user; // remove nbrClicks from user
      return {
        token: action.payload.token,
        user: rest,
      };
    default:
      return state;
  }
};
