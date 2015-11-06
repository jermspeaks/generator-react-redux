import React, { PropTypes, Component } from 'react';
import styles from './Footer.scss';
import withStyles from '../../../common/decorators/withStyles';
import withViewport from '../../../common/decorators/withViewport';
import {Link} from 'react-router';

// @withViewport
class Footer extends Component {

  // static propTypes = {
  //   viewport: PropTypes.shape({
  //     width: PropTypes.number.isRequired,
  //     height: PropTypes.number.isRequired
  //   }).isRequired
  // };

  render() {
    // This is just an example how one can render CSS
    // let { width, height } = this.props.viewport;x
    // this.renderCss(`.Footer-viewport:after {content:' ${width}x${height}';}`);
    // <span className="Footer-spacer"> | </span>
    // <span ref="viewport" className="Footer-viewport Footer-text Footer-text--muted">Viewport:</span>

    return (
      <div className="Footer">
        <div className="Footer-container">
          <span className="Footer-text">© Inform, Inc. 2015</span>
          <span className="Footer-spacer">·</span>
          <Link className="Footer-link" to="/">
            <span>Home</span>
          </Link>
        </div>
      </div>
    );
  }

}

export default Footer;
