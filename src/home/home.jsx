import React, { PureComponent } from 'react'
import { connectTo } from '../_utils/generic';
import styles from './home.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { to } from '../_actions/navigation'
import { Button } from '@material-ui/core';
import { openLoading, closeLoading } from '../_actions/loading';
import { loadDialog } from '../_actions/dialog';
import { toggleSnackbar } from '../_actions/generic';
import { Link } from "react-router-dom";

class Home extends PureComponent {

  render() {
    const { loadDialog,openLoading,closeLoading,toggleSnackbar } = this.props;
    return (
      <div className="container">
        <div className={styles.maincontent}>
          <span>
            <Button onClick={() => loadDialog({
              dialogContent: <div>test</div>,
              dialogTitle: "aaaa",
              openDialog: true,
              closeDialog: () => { alert("close"); }
            })} color='primary' size='small'>dialog</Button>

            <Button onClick={() => {openLoading(); setTimeout(function(){ closeLoading(); }, 3000);}} color='primary' size='small'>loading</Button>

            <Button onClick={() => {toggleSnackbar("test");}} color='primary' size='small'>snakbar</Button>
            
            <Link to={"/region"} className={styles.link}>استان</Link>
            <Link to={"/city"} className={styles.link}>شهرها</Link>
            <Link to={"/reseller"} className={styles.link}>نماینده</Link>
            

            home
          </span>
        </div>
      </div>
    );
  }
}

export default connectTo(
  state => ({

  }),
  { to, loadDialog,openLoading,closeLoading,toggleSnackbar },
  withStyles(styles)(Home)
)