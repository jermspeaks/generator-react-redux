import React, { PropTypes, Component } from 'react';
import styles from './App.scss';
import withStyles from '../../../common/decorators/withStyles';
import withContext from '../../../common/decorators/withContext';
import Header from '../Header';
import Footer from '../Footer';
import AuthStore from '../../../auth/stores/AuthStore';

@withContext
class App extends Component {

  static propTypes = {
    children: PropTypes.element,
    error: PropTypes.object,
    history: PropTypes.object
  };

  constructor() {
    super();
    this.state = this._getLoginState();
  }

  componentDidMount() {
    this.changeListener = this._onLoginChange.bind(this);
    AuthStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener(this.changeListener);
  }

  _getLoginState() {
    return {
      userLoggedIn: AuthStore.isLoggedIn()
    };
  }

  /*
    This event handler deals with all code-initiated routing transitions
    when logging in or logging out
  */
  _onLoginChange() {
    //get a local up-to-date record of the logged-in state
    //see https://facebook.github.io/react/docs/component-api.html
    let userLoggedInState = this._getLoginState();
    this.setState(userLoggedInState);

    //get any nextTransitionPath - NB it can only be got once then it self-nullifies
    //TODO change to an or statement to go back to it's original page before logging in
    let transitionPath = '/';

    //trigger router change
    if (userLoggedInState.userLoggedIn) {
      this.props.history.pushState(null, transitionPath);
    } else {
      this.props.history.pushState(null, '/login');
    }
  }

  render() {
    if (!!this.props.error) {
      return this.props.children;
    } else if (!!this.state.userLoggedIn) {
      return (
        <div className='wrapper'>
          <Header userLoggedIn='true' />
          <div className='content'>
            {this.props.children}
          </div>
          <Footer userLoggedIn='true' />
        </div>
      );
    } else {
      return (
        <div className='wrapper'>
          <Header />
          <div className='content'>
            {this.props.children}
          </div>
          <Footer />
        </div>
      );
    }
  }

}

export default App;
