import React, { PropTypes, Component } from 'react';
import styles from './Header.scss';
import withStyles from '../../../common/decorators/withStyles';
import { Link } from 'react-router';

class Header extends Component {

  static propTypes = {
    username: PropTypes.string,
    logoutUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this._logout = this._logout.bind(this);
  }

  _logout(event) {
    event.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
      <div className="Header">
        <div className="Header-brand">
          <Link to="/">
            <span className="Header-brandTxt" id="header-brand-text">INFORM&#8482;</span>
          </Link>
        </div>
        <div className='Navigation' role='navigation'>
          <Link className='Navigation-link' to='/about' >About</Link>
          <span className='Navigation-spacer'> | </span>
          <div className='Navigation-user'>
            <span>Welcome, </span>
            <span className='Navigation-user--username'>{this.props.username}</span>
            <span className='Navigation-spacer'> | </span>
            <a className='Navigation-link Navigation-user--logout' onClick={this._logout}>Logout</a>
          </div>
        </div>
        <div className="clear-float"></div>
      </div>
    );
  }
}

export default Header;
