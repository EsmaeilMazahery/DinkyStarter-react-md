import React from 'react'

import { closeDialog } from '../../_actions/dialog'

import { connectTo } from '../../_utils/generic'

import styles from './loadingWrapper.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, CircularProgress } from '@material-ui/core';

class LoadingWrapper extends React.Component {

  render() {
    const { open, closeButton } = this.props;
     if (!open) return null;

    return (
      <Dialog open={true} aria-labelledby="simple-dialog-title">
        <div className={styles.container}>
          <CircularProgress />
        </div>
      </Dialog>
    )
  }
}

export default connectTo(
  state => ({
    open: state.loading.open,
    closeButton: state.loading.closeButton,
  }),
  { closeDialog },
  LoadingWrapper
)
