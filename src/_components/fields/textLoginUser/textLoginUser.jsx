import React from 'react'
import { FormControl, InputLabel, Input, InputAdornment, TextField } from '@material-ui/core'
import styles from './textLoginUser.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import renderFromHelper from '../renderFromHelper';

const TextFieldForRender = ({
  input,
  label,
  className,
  meta: { active, error, warning, touched },
  ...custom
}) => {
  return (
    < FormControl className={className} required >
      <InputLabel htmlFor="userName">{label}</InputLabel>
      <Input
        {...input}
        {...custom}
        type='text'
        endAdornment={
          <InputAdornment position="end">
            <FontAwesomeIcon icon="user-circle" />
          </InputAdornment>
        }
      />
      {renderFromHelper({ touched, error })}
    </FormControl >
  )
}

export default withStyles(styles)(TextFieldForRender)
