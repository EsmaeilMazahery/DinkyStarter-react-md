import React, { PureComponent } from 'react'
import styles from './Styles.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { connectTo } from '../_utils/generic';

class PageNotFound extends PureComponent {
  render() {
    return (
      <div>Page Not Found </div>
    );
  }
}

export default connectTo(
  state => ({

  }),
  {},
  withStyles(styles)(PageNotFound)
)