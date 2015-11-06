import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';

const rootReducer = combineReducers({
  router
});

export default rootReducer;
