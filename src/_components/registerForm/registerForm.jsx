import React, { PureComponent } from 'react'
import { Button } from '@material-ui/core'
import styles from './registerForm.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { connectTo } from '../../_utils/generic';

class RegisterForm extends PureComponent {

  render() {
    const { form,fields, handleSubmit, onSubmit, enabledSubmit, backBtn, backLink } = this.props
    return (
      <div className={styles.container}>
        <form>
          {fields}
          <div className={styles.actions}>
              <Button variant="outlined" className={styles.button} disabled={!enabledSubmit} 
              onClick={handleSubmit(onSubmit)}>ثبت</Button>

              {backBtn && <Link to={backLink} className={styles.link}>
              <Button variant="outlined" color="secondary" className={styles.button} >برگشت</Button>
              </Link>}
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
  RegisterForm)
)
