import React, { PropTypes, Component } from 'react';
import styles from './LandingPage.scss';
import withStyles from '../../common/decorators/withStyles';

class LandingPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    let title = 'React Redux Boilerplate';
    this.context.onSetTitle(title);

    return (
      <div className='LandingPage'>
        <div className='LandingPage-container'>
          <h1>{title}</h1>
          <p>Collaboratively administrate empowered markets via plug-and-play
            networks. Dynamically procrastinate B2C users after installed base
            benefits. Dramatically visualize customer directed convergence
            without revolutionary ROI.</p>
          <br />
          <p>Efficiently unleash cross-media information without cross-media
            value. Quickly maximize timely deliverables for real-time schemas.
            Dramatically maintain clicks-and-mortar solutions without functional
            solutions.</p>
          <br />
          <p>Completely synergize resource taxing relationships via premier
            niche markets. Professionally cultivate one-to-one customer service
            with robust ideas. Dynamically innovate resource-leveling customer
            service for state of the art customer service.</p>
        </div>
      </div>
    );
  }

}

export default LandingPage;
