import 'whatwg-fetch';
// our packages
import * as ActionTypes from './actionTypes';

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
        } else {
          dispatch(errorClickUpdate({error: json.message}));
        }
      }).catch(err =>
        dispatch(errorClickUpdate({error: err})),
      );
  };
};
