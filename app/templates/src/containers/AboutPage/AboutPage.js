import React, { PropTypes, Component } from 'react';
import styles from './AboutPage.scss';
import LineChart from '../../common/components/LineChart';

class AboutPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    let title = 'About Us';
    this.context.onSetTitle(title);
    const data = [
      [Date.UTC(2014, 9, 21), 0],
      [Date.UTC(2014, 10, 4), 0.28],
      [Date.UTC(2014, 10, 9), 0.25],
      [Date.UTC(2014, 10, 27), 0.2],
      [Date.UTC(2014, 11, 2), 0.28],
      [Date.UTC(2014, 11, 26), 0.28],
      [Date.UTC(2014, 11, 29), 0.47],
      [Date.UTC(2015, 0, 11), 0.79],
      [Date.UTC(2015, 0, 26), 0.72],
      [Date.UTC(2015, 1, 3), 1.02],
      [Date.UTC(2015, 1, 11), 1.12],
      [Date.UTC(2015, 1, 25), 1.2],
      [Date.UTC(2015, 2, 11), 1.18],
      [Date.UTC(2015, 3, 11), 1.19],
      [Date.UTC(2015, 4, 1), 1.85],
      [Date.UTC(2015, 4, 5), 2.22],
      [Date.UTC(2015, 4, 19), 1.15],
      [Date.UTC(2015, 5, 3), 0]
    ];

    return (
      <div className="AboutPage">
        <div className="AboutPage-container">
          <h1>{title}</h1>
          <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </p>
          <h2 className='LineChart-Title'>Annual Revenue over Time</h2>
          <LineChart series={data} yAxisTitle='Revenue' />
        </div>
      </div>
    );
  }

}

export default AboutPage;
