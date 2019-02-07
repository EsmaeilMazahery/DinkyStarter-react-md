import React from 'react'

import Navbar from '../_components/NavBar'
import Navbar2 from '../_components/NavBar2'
import DialogWrapper from '../_components/dialogWrapper'
import LoadingWrapper from '../_components/loadingWrapper'
import Snackbar from '../_components/snackbar'

import { Router, Route } from 'react-router-dom';
import { history } from '../_utils/history';

import Login from '../_components/auth/login';
import ForgetPassword from '../_components/auth/forgetPassword';
import Role from '../_components/auth/role';
import Home from '../_components/home';
import Sidbar from '../_components/sidbar';

import { to } from '../_actions/navigation'
import { moveMouse, changePageSize } from '../_actions/generic'

import { connectTo } from '../_utils/generic'
import { PAGES_WITH_NAVBAR, PAGES_WITH_SIDEBAR, PAGES_WITH_AUTH, PAGES_WITH_UNAUTH, PAGES_WITH_NAVBAR2 } from '../_constants/navigation'

import styles from './layouts.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { PrivateRoute } from '../_components/PrivateRoute';
import { ArrayRoute } from '../_components/ArrayRoute';

class MainLayout extends React.Component {
  render() {
    return (
      <Router history={history}>
        <>
          <ArrayRoute exact Patharray={PAGES_WITH_AUTH} component={
            () => {
              return (
                <div className={styles.Layout}>
                  <ArrayRoute exact Patharray={PAGES_WITH_NAVBAR} component={Navbar} />

                  <div className={styles.main}>
                    <ArrayRoute exact Patharray={PAGES_WITH_SIDEBAR} component={Sidbar} />

                    <div className={styles.content}>
                      <ArrayRoute exact Patharray={PAGES_WITH_NAVBAR2} component={Navbar2} />

                      <div className={styles.maincontent}>
                        <PrivateRoute exact Patharray="/" component={Home} />
                      </div>
                    </div>


                  </div>
                </div>
              )
            }
          } />
          <ArrayRoute exact Patharray={PAGES_WITH_UNAUTH} component={
            () => {
              return (
                <div className={styles.Layout}>
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/forgetpassword' component={ForgetPassword} />
                  <Route exact path='/role/:roleId' component={Role} />
                </div>
              )
            }
          } />

          <DialogWrapper></DialogWrapper>
          <LoadingWrapper></LoadingWrapper>
          <Snackbar></Snackbar>
        </>
      </Router>
    )
  }

  // no need to remove event listeneres declared in this block
  // since it will not be unmounted
  componentDidMount() {
    const { moveMouse, changePageSize } = this.props
    window.addEventListener('popstate', this.popstate)
    window.addEventListener('resize', () =>
      changePageSize({ width: window.innerWidth, height: window.innerHeight })
    )
    document.addEventListener('mousemove', ({ clientX, clientY }) =>
      moveMouse({ mouseX: clientX, mouseY: clientY })
    )
  }

  // to: custom back button handle
  popstate = () => {
    // const { page, currentProject, to } = this.props
    // if (page === 'Dashboard') return

    // window.history.pushState({ }, '', '')
    // to((page === 'ProjectDetails' || !currentProject) ? 'Dashboard' : 'ProjectDetails')
  }
}

export default connectTo(
  state => ({
    page: state.navigation.page
  }),
  { moveMouse, changePageSize, to },
  withStyles(styles)(MainLayout)
)
