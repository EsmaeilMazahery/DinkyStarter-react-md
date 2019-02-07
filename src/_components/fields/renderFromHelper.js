import React from 'react'
import { FormHelperText } from '@material-ui/core';

export default ({ touched, error }) => {
    if (!(touched && error)) {
      return
    } else {
      return <FormHelperText>{touched && error}</FormHelperText>
    }
  }
