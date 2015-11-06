import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import auth from '../../auth/reducers/auth';

const rootReducer = combineReducers({
  router,
  auth
});

export default rootReducer;
