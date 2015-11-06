import React, { PropTypes, Component } from 'react';
import styles from './Footer.scss';
import withStyles from '../../../common/decorators/withStyles';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="Footer-container">
          <span className="Footer-text">React & Redux Generator, 2015</span>
        </div>
      </div>
    );
  }

}

export default Footer;
