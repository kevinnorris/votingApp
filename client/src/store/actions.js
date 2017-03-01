import 'whatwg-fetch';

// our packages
import * as ActionTypes from './actionTypes';
import {saveUser, saveToken, deleteInfo} from '../util/localStorage';

// FIX THIS so its not hard coded
const apiUrl = 'https://qckvote.herokuapp.com/api/';

const setUserId = payload => ({
  type: ActionTypes.SET_USER,
  payload,
});

export const getAnonUser = () => (
  (dispatch) => {
    return fetch(`${apiUrl}getUser`)
      .then(response => response.json())
      .then((json) => {
        dispatch(setUserId({_id: `${json.ip},${json.userAgent.substring(0, 17)}`, name: 'Anonymous'}));
      }).catch((err) => {
        console.log(err.message);
      });
  }
);

// Required payload: {token: jwt, user: user object returned from auth}
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

// Required payload: {poll: poll object returned from server, userId: users Id, not included if not logged in}
export const setActivePoll = payload => ({
  type: ActionTypes.SET_ACTIVE_POLL,
  payload,
});

// Required payload: {ascending: bool}
export const setAscending = payload => ({
  type: ActionTypes.SET_ASCENDING,
  payload,
});

// Required payload: {activePage: Number}
const setPage = payload => ({
  type: ActionTypes.SET_PAGE,
  payload,
});

// Required payload: {sortByVotes: bool}
export const setSort = payload => ({
  type: ActionTypes.SET_SORT,
  payload,
});

const requestPolls = () => ({
  type: ActionTypes.REQUEST_POLLS,
});

// Required payload: {polls: array of polls from server, numOfPages: Number}
const receivePolls = payload => ({
  type: ActionTypes.RECIEVED_POLLS,
  payload,
});

// Required payload: {error: String, location: where error occured}
const errorPolls = payload => ({
  type: ActionTypes.ERROR_POLLS,
  payload,
});

/*
  If userId is supplied we are making a call for myPolls and
  thus don't want to change ascending, sortByVotes, or activePage
*/
// Required payload: {ascending: bool, sortByVotes: bool, activePage: Number, userId: String, this is optional}
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

const requestPoll = () => ({
  type: ActionTypes.REQUEST_POLL,
});

// Required payload: {error: String, location: where error occured}
const errorPoll = payload => ({
  type: ActionTypes.ERROR_POLLS,
  payload,
});

// Required payload: {pollId: String, userId: String}
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

// Required payload: {error: String, location: where error occured}
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

// Required payload: {error: String, location: where error occured}
const errorNewPoll = payload => ({
  type: ActionTypes.SENDING_NEW_POLL,
  payload,
});

// Required payload: {question: String, answers: array of String, authorId: String, authorName: String, token: String}
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

// Required payload: {error: String, location: where error occured}
const errorDeletingPoll = payload => ({
  type: ActionTypes.ERROR_DELETING_POLL,
  payload,
});

const successDeletingPoll = () => ({
  type: ActionTypes.SUCCESS_DELETING_POLL,
});

// Required payload: {pollId: String, token: String}
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

// Required payload: {error: String, location: where error occured}
const errorAddingAnswer = payload => ({
  type: ActionTypes.ERROR_ADDING_ANSWER,
  payload,
});

// Required payload: {pollId: String, answer: String, token: String, userId: String}
export const addAnswer = payload => (
  (dispatch) => {
    dispatch(addingAnswer());
    return fetch(`${apiUrl}addAnswer`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then((json) => {
        if (json.success) {
          dispatch(getPoll({pollId: payload.pollId, userId: payload.userId}));
        } else {
          dispatch(errorAddingAnswer({error: json.error, location: 'json'}));
        }
      }).catch(err =>
        dispatch(errorAddingAnswer({error: err.message, location: 'fetch'})),
      );
  }
);
