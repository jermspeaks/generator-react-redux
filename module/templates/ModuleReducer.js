import * as types from '../constants/<%= moduleConstants %>';

const initialState = {};

export default function <%= moduleName %>(state = initialState, action) {
  switch(action.type) {
  case types.SAMPLE_REQUEST:
    return Object.assign({}, state, {});
  case types.SAMPLE_SUCCESS:
    return Object.assign({}, state, {});
  case types.SAMPLE_FAILURE:
    return Object.assign({}, state, initialState);
  default:
    return state;
  }
};
