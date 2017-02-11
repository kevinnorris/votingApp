import 'whatwg-fetch';

// our packages
import * as ActionTypes from './actionTypes';
import {saveUser} from '../util/localSaveUser';

export const updateToken = payload => ({
  type: ActionTypes.UPDATE_TOKEN,
  payload,
});

export const loginSuccess = payload => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload,
});

const requestClickUpdate = payload => ({
  type: ActionTypes.REQUEST_UPDATE_CLICK,
  payload,
});

const receiveClickUpdate = () => ({
  type: ActionTypes.RECIEVED_UPDATE_CLICK,
});

const errorClickUpdate = payload => ({
  type: ActionTypes.ERROR_UPDATE_CLICK,
  payload,
});

export const updateClicks = (payload) => {
  return (dispatch) => {
    // state updated to inform that the API call is starting
    dispatch(requestClickUpdate());

    return fetch(`http://localhost:8080/api/addClick?id=${payload.id}&token=${payload.token}`)
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(receiveClickUpdate());
          saveUser();
        } else {
          dispatch(errorClickUpdate({error: json.message}));
        }
      }).catch(err =>
        dispatch(errorClickUpdate({error: err})),
      );
  };
};

const receiveClickReste = () => ({
  type: ActionTypes.RECIEVED_RESET_CLICK,
});

export const resetClicks = (payload) => {
  return (dispatch) => {
    // state updated to inform that the API call is starting
    dispatch(requestClickUpdate());

    return fetch(`http://localhost:8080/api/resetClicks?id=${payload.id}&token=${payload.token}`)
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(receiveClickReste());
          saveUser();
        } else {
          dispatch(errorClickUpdate({error: json.message}));
        }
      }).catch(err =>
        dispatch(errorClickUpdate({error: err})),
      );
  };
};
