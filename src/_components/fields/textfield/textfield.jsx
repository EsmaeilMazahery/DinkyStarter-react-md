import React from 'react'
import { FormControl, InputLabel, Input } from '@material-ui/core'
import styles from './textfield.module.scss';
import { withStyles } from '@material-ui/core/styles';
import renderFromHelper from '../renderFromHelper';

const TextFieldForRender = ({
  input,
  label,
  value,
  className,
  meta: { active, error, warning, touched },
  ...custom
}) => {
  return (
    <FormControl className={className}>
      <InputLabel htmlFor={input.name}>{label}</InputLabel>
      <Input
        {...input}
        {...custom}
        type='text'
      />
      {renderFromHelper({ touched, error })}
    </FormControl >
  )
}

export default withStyles(styles)(TextFieldForRender)