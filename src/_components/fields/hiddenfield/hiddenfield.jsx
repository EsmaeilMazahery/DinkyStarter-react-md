import React from 'react'
import { Input } from '@material-ui/core'
import styles from './hiddenfield.module.scss';
import { withStyles } from '@material-ui/core/styles';

const HiddenFieldForRender = ({
  val,
  label,
  ...custom
}) => {
  return (
    <div className={styles.hidden}>
      <Input
        {...custom}
        type='text'
        value={val}
      />
    </div>

  )
}

export default withStyles(styles)(HiddenFieldForRender)