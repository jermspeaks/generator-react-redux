import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './<%= modulePage %>.scss';
import * as <%= moduleCommonName %> from '../../actions/<%= moduleActions %>';

class <%= modulePage %> extends Component {
  static propTypes = {
    <%= moduleCommonName %>: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
  };

  render() {
    const { actions } = this.props;
    return (
      <div className='<%= moduleName %>'>
        <div className='<%= moduleName %>-container'>
        </div>
      </div>
    );
  }

}

function mapState(state) {
  return {
    <%= moduleCommonName %>: state.<%= moduleCommonName %>
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(<%= moduleActions %>, dispatch),
  };
}

export default connect(mapState, mapDispatch)(<%= modulePage %>);
