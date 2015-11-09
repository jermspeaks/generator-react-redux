import { combineReducers } from 'redux';
import { routerStateReducer as router } from 'redux-router';
import <%= moduleName %> from '../../<%= moduleName %>/reducers/<%= moduleName %>';

const rootReducer = combineReducers({
  router,
  <%= moduleName %>
});

export default rootReducer;
