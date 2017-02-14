import 'whatwg-fetch';

// our packages
import * as ActionTypes from './actionTypes';
import {saveUser, saveToken, updateUser, deleteInfo} from '../util/localStorage';

const apiUrl = 'http://localhost:8080/api/';

// Authentication actions
export const loginSuccess = (payload) => {
  saveUser(payload.user);
  saveToken(payload.token);
  return ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload,
  });
};

export const logoutUser = () => {
  deleteInfo();
  return {type: ActionTypes.LOGOUT};
};


// Poll actions
const requestPolls = payload => ({
  type: ActionTypes.REQUEST_POLLS,
  payload,
});

const receivePolls = payload => ({
  type: ActionTypes.RECIEVED_POLLS,
  payload,
});

const errorPolls = payload => ({
  type: ActionTypes.ERROR_POLLS,
  payload,
});

export const getPolls = (payload) => {
  return (dispatch) => {
    dispatch(requestPolls());

    return fetch(`${apiUrl}getPolls?id=${payload.id}&token=${payload.token}`)
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(receivePolls({polls: json.polls}));
        } else {
          dispatch(errorPolls({error: json.error, location: 'json'}));
        }
      }).catch(err =>
        dispatch(errorPolls({error: err, location: 'fetch'})),
      );
  };
};


// Click actions
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
          updateUser();
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
          updateUser();
        } else {
          dispatch(errorClickUpdate({error: json.message}));
        }
      }).catch(err =>
        dispatch(errorClickUpdate({error: err})),
      );
  };
};


