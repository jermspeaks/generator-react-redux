import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './App.scss';
import withContext from '../../common/decorators/withContext';
import { pushState } from 'redux-router';
import Header from '../../common/components/Header';
import Footer from '../../common/components/Footer';
import * as LoginActions from '../../auth/actions/LoginActions';

@withContext
class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
    history: PropTypes.object.isRequired,
    routes: PropTypes.array,
    params: PropTypes.object,
    auth: PropTypes.object.isRequired,
    authActions: React.PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  componentWillMount() {
    this.initializeAuthentication();
  }

  componentWillUpdate(nextProps) {
    const routeName = nextProps.routes[this.props.routes.length - 1].name;

    if (!nextProps.auth.authStatus.authenticated && routeName !== 'reset_password') {
      this.goToLogin();
    }
  }

  initializeAuthentication() {
    const token = localStorage.getItem('jwt');
    const routeName = this.props.routes[this.props.routes.length - 1].name;
    const resetToken = this.props.params.token;

    if (this.props.auth.authStatus.authenticated) {
      // Don't have to do anything here
    } else if (token) {
      // CASE: Local storage token found
      console.info(token);
    } else if (routeName === 'reset_password' && resetToken) {
      // CASE: Reset password
      this.goToResetPassword(resetToken);
    } else {
      // CASE: no authentication
      this.goToLogin();
    }
  }

  goToLogin() {
    this.props.pushState(null, '/login');
  }

  goToResetPassword(token) {
    this.props.pushState(null, '/reset_password/' + token);
  }

  render() {
    const { authActions } = this.props;

    let page;
    if (!this.props.auth.authStatus.authenticated) {
      page = (
        <div>
          {this.props.children}
        </div>
      );
    } else {
      page = (
        <div>
          <Header username={this.props.auth.user.username} logoutUser={authActions.logoutUser} />
          <div className='content'>
            {this.props.children}
          </div>
          <Footer />
        </div>
      )
    }
    return (
      <div className='wrapper'>
        {page}
      </div>
    );
  }

}

function mapState(state) {
  return {
    auth: state.auth
  };
}

function mapDispatch(dispatch) {
  return {
    authActions: bindActionCreators(LoginActions, dispatch),
    pushState: bindActionCreators(pushState, dispatch),
  };
}

export default connect(mapState, mapDispatch)(App);
