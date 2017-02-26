import 'whatwg-fetch';

// our packages
import * as ActionTypes from './actionTypes';
import {saveUser, saveToken, deleteInfo} from '../util/localStorage';

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

export const setActivePoll = payload => ({
  type: ActionTypes.SET_ACTIVE_POLL,
  payload,
});

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

/*
  If userId is supplied we are making a call for myPolls and
  thus don't want to change ascending, sortByVotes, or activePage
*/
export const getPolls = payload => (
  (dispatch) => {
    let queryString = '?';

    dispatch(requestPolls());

    queryString += `ascending=${payload.ascending}`;
    queryString += `&sortByVotes=${payload.sortByVotes}`;
    queryString += `&activePage=${payload.activePage}`;

    if (!payload.userId) {
      dispatch(setAscending({ascending: payload.ascending}));
      dispatch(setSort({sortByVotes: payload.sortByVotes}));
      dispatch(setPage({activePage: payload.activePage}));
    } else {
      queryString += `&userId=${payload.userId}`;
    }

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


const errorVote = payload => ({
  type: ActionTypes.ERROR_VOTE,
  payload,
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
          dispatch(getPoll({pollId: payload.pollId, userId: payload.userId}));
        } else {
          dispatch(errorVote({error: json.error, location: 'json'}));
        }
      }).catch(err =>
        dispatch(errorVote({error: err.message, location: 'fetch'})),
      );
  }
);

const sendingNewPoll = () => ({
  type: ActionTypes.SENDING_NEW_POLL,
});

const errorNewPoll = payload => ({
  type: ActionTypes.SENDING_NEW_POLL,
  payload,
});

export const submitNewPoll = payload => (
  (dispatch) => {
    dispatch(sendingNewPoll());

    return fetch(`${apiUrl}savePoll`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          dispatch(errorNewPoll({error: json.error, location: 'json'}));
        }
      }).catch(err =>
        dispatch(errorNewPoll({error: err.message, location: 'fetch'})),
      );
  }
);

const deletingPoll = () => ({
  type: ActionTypes.DELETING_POLL,
});

const errorDeletingPoll = payload => ({
  type: ActionTypes.ERROR_DELETING_POLL,
  payload,
});

const successDeletingPoll = () => ({
  type: ActionTypes.SUCCESS_DELETING_POLL,
});

export const deletePoll = payload => (
  (dispatch) => {
    dispatch(deletingPoll());

    return fetch(`${apiUrl}deletePoll`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(successDeletingPoll());
        } else {
          dispatch(errorDeletingPoll({error: json.error, location: 'json'}));
        }
      }).catch(err =>
        dispatch(errorDeletingPoll({error: err.message, location: 'fetch'})),
      );
  }
);

const addingAnswer = () => ({
  type: ActionTypes.ADDING_ANSWER,
});

const errorAddingAnswer = payload => ({
  type: ActionTypes.ERROR_ADDING_ANSWER,
  payload,
});

export const addAnswer = payload => (
  (dispatch) => {
    console.log('addAnswer called with payload: ', payload);
    dispatch(addingAnswer());

    return fetch(`${apiUrl}addAnswer`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(getPoll({pollId: payload.pollId}));
        } else {
          dispatch(errorAddingAnswer({error: json.error, location: 'json'}));
        }
      }).catch(err =>
        dispatch(errorAddingAnswer({error: err.message, location: 'fetch'})),
      );
  }
);
