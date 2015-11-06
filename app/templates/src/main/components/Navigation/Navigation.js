import React, { PropTypes, Component } from 'react';
import styles from './Navigation.scss';
import withStyles from '../../../common/decorators/withStyles';
import classNames from 'classnames';
import {Link} from 'react-router';
import AuthService from '../../../auth/services/AuthService';
import AuthStore from '../../../auth/stores/AuthStore';

class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
    userLoggedIn: PropTypes.bool
  };

  constructor() {
    super();
    this._logout = this._logout.bind(this);
  }

  _logout(event) {
    event.preventDefault();
    AuthService.logout();
  }

  showUser() {
    if (!!this.props.userLoggedIn) {
      let username = AuthStore.user.username;
      return (
        // jscs:disable maximumLineLength
        <div className='Navigation-user'>
          <span>Welcome, </span>
          <span className='Navigation-user--username'>{username}</span>
          <span className='Navigation-spacer'> | </span>
          <a className='Navigation-link Navigation-user--logout' onClick={this._logout}>Logout</a>
        </div>
      );
      // jscs:enable maximumLineLength
    } else {
      return (
        <Link className='Navigation-link' to='/login'>Log in</Link>
      );
    }
  }

  render() {
    // jscs:disable maximumLineLength
    return (
      <div className={classNames(this.props.className, 'Navigation')} role='navigation'>
        <Link className='Navigation-link' to='/about' >About</Link>
        <Link className='Navigation-link' to='/contact'>Contact</Link>
        <span className='Navigation-spacer'> | </span>
        {this.showUser()}
      </div>
    );
    // jscs:enable maximumLineLength
  }

}

export default Navigation;
