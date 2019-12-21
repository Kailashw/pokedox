import * as types from '../actions/actionTypes';

export default function(state = false, action) {
  switch (action.type) {
    case types.LOADING:
      return action.payload;
    default:
      return state;
  }
}