/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './Header.scss';
import withStyles from '../../../common/decorators/withStyles';
import {Link} from 'react-router';
import Navigation from '../Navigation';

class Header extends Component {

  static propTypes = {
    userLoggedIn: PropTypes.string
  };

  render() {
    return (
      <div className="Header">
        <div className="Header-brand">
          <Link to="/">
            <span className="Header-brandTxt" id="header-brand-text">Your Brand</span>
          </Link>
        </div>
        <Navigation className="Header-nav" userLoggedIn={!!this.props.userLoggedIn} />
        <div className="clear-float"></div>
      </div>
    );
  }

}

export default Header;
