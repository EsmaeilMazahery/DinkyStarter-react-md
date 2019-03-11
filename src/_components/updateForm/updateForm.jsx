import React, { PureComponent } from 'react'
import { Button } from '@material-ui/core'
import styles from './updateForm.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { connectTo } from '../../_utils/generic';

class UpdateForm extends PureComponent {

  render() {
    const { fields, handleSubmit, onSubmit, enabledSubmit, backBtn, backLink } = this.props
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields}
          <div className={styles.actions}>
            <div>
              <Button type="submit" variant="outlined" className={styles.button} disabled={!enabledSubmit} >ثبت</Button>

              {backBtn && <Link to={backLink} className={styles.link}>برگشت</Link>}
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
  UpdateForm)
)
