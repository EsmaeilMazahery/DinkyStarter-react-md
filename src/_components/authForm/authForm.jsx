import React from 'react'
import { Button } from '@material-ui/core'
import styles from './authForm.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { submitAsyncValidation } from '../../_utils/forms'
import { Link } from "react-router-dom";
import { connectTo } from '../../_utils/generic';

const authform = ({ companyName, handleSubmit, enabledSubmit, onSubmit, submitText, linkTextClick, bottomText, fields }) => {
  return (
    <div className={styles.pageStyle}>
      <div className={styles.container}>
        <div className={styles.maincontent}>
          <form onSubmit={submitAsyncValidation(handleSubmit, enabledSubmit, onSubmit)}>
            <div className={styles.box}>
              <div className={styles.header}>
                <div>
                  <img alt={companyName} src="http://185.179.168.5:800/photo.ashx?id=1"></img><br />
                  <span className="t3">سامانه ارتباط مشتریان ، {companyName} </span>
                </div>
              </div>
              {fields}
              <div className={styles.actions}>
                <div>
                  <Button type="submit" className={styles.button} disabled={!enabledSubmit}>{submitText}</Button>
                </div>
                <div className={styles.forgetpassword}>
                  <Link to={linkTextClick} className={styles.link}>{bottomText}</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default withStyles(styles)(connectTo(
  state => ({
    companyName: state.generic.companyName
  }),
  {},
  authform)
)