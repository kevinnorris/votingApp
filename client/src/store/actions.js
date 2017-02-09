import * as ActionTypes from './actionTypes';

export const updateToken = payload => ({
  type: ActionTypes.UPDATE_TOKEN,
  payload,
});

export const loginSuccess = payload => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload,
});

export const click = payload => ({
  type: ActionTypes.CLICK,
  payload,
});
