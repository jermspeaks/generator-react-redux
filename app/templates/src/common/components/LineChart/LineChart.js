import React, { PropTypes, Component } from 'react';
import styles from './LineChart.scss';

export default class LineChart extends Component {
  static propTypes = {
    series: PropTypes.array.isRequired,
    yAxisTitle: PropTypes.string,
    seriesName: PropTypes.string
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { series, seriesName, yAxisTitle } = this.props;
    let graph;

    if (window === undefined) {
      graph = (<div></div>);
    } else {
      const Highcharts = require('react-highcharts/dist/bundle/highcharts');
      const config = {
        chart: {
          spacingTop: 20
        },
        title: {
          text: ''
        },
        plotOptions: {
          line: {
            color: '#666666'
          }
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            month: '%b \'%y',
            year: '%b'
          },
          title: {
            text: 'Date',
          }
        },
        yAxis: {
          lineWidth: 1,
          tickWidth: 1,
          title: {
            text: yAxisTitle,
            align: 'high',
            offset: 0,
            rotation: 0,
            y: -10
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          name: seriesName,
          data: series
        }],
        credits: {
          enabled: false
        }
      }
      graph = (
        <div className='LineChart--container'>
          <Highcharts config={config} />
        </div>
      );
    }
    return (
      <div>
        {graph}
      </div>
    );
  }
}
