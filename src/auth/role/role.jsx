import React, { PureComponent } from 'react'
import { connectTo } from '../../_utils/generic';
import styles from './role.module.scss';
import { withStyles } from '@material-ui/core/styles';

class Role extends PureComponent {
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="container">
        <div className={styles.maincontent}>
          <span>
            asfdagads
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  
}

const connectedRole = withStyles(styles)(connectTo(mapStateToProps,{},Role));
export default  connectedRole ;
