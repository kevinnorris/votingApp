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

// Ui actions
export const setActivePoll = payload => ({
  type: ActionTypes.SET_ACTIVE_POLL,
  payload,
});


// Poll actions
export const setAscending = payload => ({
  type: ActionTypes.SET_ASCENDING,
  payload,
});

const setPage = payload => ({
  type: ActionTypes.SET_PAGE,
  payload,
});

export const setSort = payload => ({
  type: ActionTypes.SET_SORT,
  payload,
});

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

export const getPolls = payload => (
  (dispatch) => {
    dispatch(requestPolls());

    let queryString = '?';
    dispatch(setAscending({ascending: payload.ascending}));
    queryString += `ascending=${payload.ascending}`;
    dispatch(setSort({sortByVotes: payload.sortByVotes}));
    queryString += `&sortByVotes=${payload.sortByVotes}`;
    dispatch(setPage({activePage: payload.activePage}));
    queryString += `&activePage=${payload.activePage}`;

    return fetch(`${apiUrl}getPolls${queryString}`)
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(receivePolls({polls: json.polls, numOfPages: json.numOfPages}));
        } else {
          dispatch(errorPolls({error: json.error, location: 'json'}));
        }
      }).catch(err =>
        dispatch(errorPolls({error: err.message, location: 'fetch'})),
      );
  }
);

const requestPoll = payload => ({
  type: ActionTypes.REQUEST_POLL,
  payload,
});

const errorPoll = payload => ({
  type: ActionTypes.ERROR_POLLS,
  payload,
});

export const getPoll = payload => (
  (dispatch) => {
    dispatch(requestPoll());

    return fetch(`${apiUrl}getPoll?id=${payload.pollId}`)
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(setActivePoll({poll: json.poll, userId: payload.userId}));
        } else {
          dispatch(errorPoll({error: json.error, location: 'json'}));
        }
      }).catch((err) => {
        dispatch(errorPoll({error: err.message, location: 'fetch'}));
      });
  }
);

const sendVote = () => ({
  type: ActionTypes.SENDING_VOTE,
});


const errorVote = () => ({
  type: ActionTypes.ERROR_VOTE,
});

export const vote = payload => (
  (dispatch) => {
    dispatch(sendVote());

    return fetch(`${apiUrl}vote`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(getPolls());
        } else {
          dispatch(errorVote({error: json.error, location: 'json'}));
        }
      }).catch(err =>
        dispatch(errorVote({error: err.message, location: 'fetch'})),
      );
  }
);


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

export const updateClicks = payload => (
  (dispatch) => {
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
  }
);

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
