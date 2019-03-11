import React from 'react'
import { Input } from '@material-ui/core'
import styles from './hiddenfield.module.scss';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const Hidden = styled.div`
  
`;

const HiddenFieldForRender = ({
  val,
  input,
  label,
  ...custom
}) => {
  return (
    <Hidden>
      
      <Input
        {...input}
        {...custom}
        type='text'
      />
    </Hidden>

  )
}

export default withStyles(styles)(HiddenFieldForRender)