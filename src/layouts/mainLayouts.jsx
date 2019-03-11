import React from 'react'

import Navbar from '../_components/NavBar/NavBar'
import Navbar2 from '../_components/NavBar2/NavBar2'
import Sidbar from '../_components/sidbar/sidbar';

import { to } from '../_actions/navigation'
import { moveMouse, changePageSize } from '../_actions/generic'

import { connectTo } from '../_utils/generic'
import styles from './mainLayouts.module.scss';
import { withStyles } from '@material-ui/core/styles';


class MainLayout extends React.Component {
  render() {
    return (
      <>
        <div className={styles.Layout}>
          <Navbar />
          <div className={styles.main}>
            <Sidbar />
            <div className={styles.content}>
              <Navbar2 />
              <div className={styles.maincontent}>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </>
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
  }
}

export default connectTo(
  state => ({
  }),
  { moveMouse, changePageSize, to },
  withStyles(styles)(MainLayout)
)
