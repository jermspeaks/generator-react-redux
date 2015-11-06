import React, { PropTypes, Component } from 'react';
import styles from './Header.scss';
import withStyles from '../../../common/decorators/withStyles';
import { Link } from 'react-router';

class Header extends Component {

  static propTypes = {
    username: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Header">
        <div className="Header-brand">
          <Link to="/">
            <span className="Header-brandTxt" id="header-brand-text">Logo</span>
          </Link>
        </div>
        <div className='Navigation' role='navigation'>
          <Link className='Navigation-link' to='/about' >About</Link>
          <span className='Navigation-spacer'> | </span>
        </div>
        <div className="clear-float"></div>
      </div>
    );
  }
}

export default Header;
