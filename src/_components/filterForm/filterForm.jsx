import React, { PureComponent } from 'react'
import { Button } from '@material-ui/core'
import styles from './filterForm.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { connectTo } from '../../_utils/generic';

class FilterForm extends PureComponent {

  render() {
    const { fields, handleSubmit, onSubmit, enabledSubmit, excel, addBtn, addText, addlink } = this.props
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields}
          <div className={styles.actions}>
            <div>
              <Button type="submit" variant="outlined" className={styles.button} disabled={!enabledSubmit} >جستجو</Button>
              {excel && <Button variant="outlined" className={styles.button} disabled={!enabledSubmit}
                onClick={handleSubmit(...values=>onSubmit({...values,excel:true}))}>اکسل</Button>}
              {addBtn && <Link to={addlink} className={styles.link}>{addText}</Link>}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(connectTo(
  state => ({

  }),
  {},
  FilterForm)
)
