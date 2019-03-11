import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import styles from './checkbox.module.scss';
import { withStyles } from '@material-ui/core/styles';

const CheckboxForRender = ({
  input,
  label,
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  )
}

export default withStyles(styles)(CheckboxForRender)