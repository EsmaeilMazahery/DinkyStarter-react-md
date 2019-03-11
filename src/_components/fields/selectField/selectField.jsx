import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import styles from './selectField.module.scss';
import { withStyles } from '@material-ui/core/styles';
import renderFromHelper from '../renderFromHelper';

const selectField = ({
  list,
  allItem,
  input: { onChange, ...input },
  label,
  change,
  className,
  meta: { active, error, warning, touched },
  ...custom
}) => {
  return (
    <FormControl className={className}>
      <InputLabel htmlFor="region">{label}</InputLabel>
      <Select
        onChange={($event) => { onChange($event); }}
        {...input}
        {...custom}>
        {allItem &&
          <MenuItem value="">
            <em>انتخاب</em>
          </MenuItem>}
        {list && list.map(m => (<MenuItem value={m.id} key={m.id}>{m.value}</MenuItem>))}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  )
}


export default withStyles(styles)(selectField)
