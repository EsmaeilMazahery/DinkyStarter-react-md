import React from 'react'
import { FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core'
import styles from './textWithAdornment.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import renderFromHelper from '../renderFromHelper';

const textWithAdornment = ({
  adornment,
  name,
  input,
  label,
  className,
  meta: { active, error, warning, touched },
  ...custom
}) => {
  return (
    <FormControl className={className} required>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        {...input}
        {...custom}
        type='text'
        endAdornment={
          <InputAdornment position="end">
            <FontAwesomeIcon icon={adornment} />
          </InputAdornment>
        }
      />
      {renderFromHelper({ touched, error })}
    </FormControl>
  )
}

export default withStyles(styles)(textWithAdornment)