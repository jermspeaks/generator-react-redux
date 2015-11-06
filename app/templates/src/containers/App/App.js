import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './App.scss';
import withContext from '../../common/decorators/withContext';
import Header from '../../common/components/Header';
import Footer from '../../common/components/Footer';

@withContext
export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
    history: PropTypes.object.isRequired,
    routes: PropTypes.array,
    params: PropTypes.object,
  };

  constructor() {
    super();
  }

  render() {
    return (
      <div className='wrapper'>
        <Header />
        <div className='content'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
