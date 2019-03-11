import React from 'react'
import { connectTo } from '../../_utils/generic'
import { Dialog, DialogTitle, Button } from '@material-ui/core';

class confirmDialog extends React.Component {
  render() {
    const { dialogContent, dialogTitle, onOK, onCancel, okText, cancelText } = this.props;
    if (!dialogContent) return null;

    return (
      <Dialog onClose={onCancel} aria-labelledby="simple-dialog-title" >
        <DialogTitle id="simple-dialog-title">{dialogTitle}</DialogTitle>
        <div>
          <Button variant="outlined" color="primary" onClick={onOK}>
            {okText ? okText : 'تایید'}
          </Button>
          <Button variant="outlined" color="primary" onClick={onCancel}>
            {cancelText ? cancelText : 'انصراف'}
          </Button>
        </div>
      </Dialog>
    )
  }
}

export default connectTo(
  state => ({

  }),
  { },
  confirmDialog
)
