import React, { PropTypes, Component } from 'react';
import styles from './<%= componentRawName %>.scss';

export default class <%= componentRawName %> extends Component {
  static propTypes = {
    // exampleProp: PropTypes.string.isRequired
  };

  static defaultProps = {
    // defaultProp: ''
  };

  constructor() {
    super();
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div className='<%= componentRawName %>'></div>
    );
  }
}
