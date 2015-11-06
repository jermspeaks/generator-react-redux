/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import { Dispatcher } from 'flux'

// const dispatcher = new Dispatcher();
//
class AppDispatcher extends Dispatcher {
  handleSubmitAction(action) {
    this.dispatch({
      source: 'SUBMIT_ACTION',
      action: action
    });
  }
}

const dispatcher = new AppDispatcher();

export default dispatcher;
