import React from 'react'
import { TextField } from '@material-ui/core'
import styles from './textfield.module.scss';
import { withStyles } from '@material-ui/core/styles';

const TextFieldForRender = ({
  input,
  label,
  meta: { active, error, warning },
  ...custom
}) => {
  const message = !active ? error || warning : undefined
  const showError = Boolean(message && input.value)
  return (
    <TextField
      label={label}
      error={showError}
      helperText={message && input.value ? message : undefined}
      {...input}
      {...custom}
    />
  )
}

export default withStyles(styles)(TextFieldForRender)