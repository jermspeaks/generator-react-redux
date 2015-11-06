import React, { PropTypes, Component } from 'react';
import styles from './LandingPage.scss';
import withStyles from '../../../common/decorators/withStyles';

class LandingPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    let title = 'Default Landing Page';
    this.context.onSetTitle(title);
    return (
      <div className='LandingPage'>
        <div className='LandingPage-container'>
          <h1>{title}</h1>
          <p>Your Brand Here</p>
        </div>
      </div>
    );
  }

}

export default LandingPage;
