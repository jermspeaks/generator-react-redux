import React, { PropTypes, Component } from 'react';
import './<%= containerRawName %>.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as ExampleActions from '../../actions/ExampleActions';
// import * as ExampleContants from '../../constants/ExampleContants';

class <%= containerRawName %> extends Component {
  static propTypes = {
    // example: PropTypes.object
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div className='<%= containerRawName %>'></div>
    );
  }
}

function mapState(state) {
  return {
    // example: state.example,
  };
}

function mapDispatch(dispatch) {
  return {
    // actions: bindActionCreators(ExampleActions, dispatch),
  };
}

export default connect(mapState, mapDispatch)(<%= containerRawName %>)
