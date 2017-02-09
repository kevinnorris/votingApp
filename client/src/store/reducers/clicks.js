import * as ActionTypes from '../actionTypes';

export const clicks = (state = {clicks: 0}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        clicks: action.payload.user.nbrClicks.clicks,
      };
    case ActionTypes.CLICK:
      return fetch(`http://localhost:8080/api/addClick?id=${action.payload.id}&token=${action.payload.token}`, {
        method: 'get',
      }).then(r => r.json())
      .then((data) => {
        console.log('add click response: ', data);
        if (!data.success) {
          console.log('Error adding click: ', data.message);
        } else {
          return {clicks: state.clicks + 1};
        }
      }).catch((err) => {
        console.log('Error adding click: ', err);
        return state;
      });
    default:
      return state;
  }
};
