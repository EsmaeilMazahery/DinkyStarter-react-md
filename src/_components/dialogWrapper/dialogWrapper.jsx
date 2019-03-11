import React from 'react'

import {closeDialog} from '../../_actions/dialog'

import { connectTo } from '../../_utils/generic'

import { Dialog, DialogTitle } from '@material-ui/core';

class DialogWrapper extends React.Component {
  
  render() {
    const { dialogContent,dialogTitle,openDialog,closeDialog} = this.props;
    if (!dialogContent) return null;

    return (
      <Dialog onClose={closeDialog} open={openDialog} aria-labelledby="simple-dialog-title" >
        <DialogTitle id="simple-dialog-title">{dialogTitle}</DialogTitle>
        <div>
          {dialogContent}
        </div>
      </Dialog>
    )
  }
}

export default connectTo(
  state => ({
    dialogContent:state.dialog.dialogContent,
    dialogTitle:state.dialog.dialogTitle,
    openDialog:state.dialog.openDialog,
    closeDialog:state.dialog.closeDialog,
  }),
  { closeDialog},
  DialogWrapper
)
