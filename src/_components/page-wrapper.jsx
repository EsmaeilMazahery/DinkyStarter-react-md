import _ from 'lodash'
import DocumentTitle from 'react-document-title'
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './page-wrapper.module.scss';
import { withStyles } from '@material-ui/core/styles';

import React from 'react'
import { HotKeys } from 'react-hotkeys'
import { connectTo } from '../_utils/generic'
import { enterPage, exitPage } from '../_actions/generic'

import Snackbar from './snackbar'

class PageWrapper extends React.Component {
  render() {
    const {
      children,
      keyMap,
      handlers,
      stateReceived,
      page,
      documentTitle = 'اسپا',
      style
    } = this.props
    this.page = page
    return stateReceived || process.env.REACT_APP_MOCK ? (
      <DocumentTitle title={documentTitle} className={styles.document}>
        {_.isEmpty(keyMap) ? (
          <div style={style}>
            <Snackbar/>
            {children}
          </div>
        ) : (
          <HotKeys
            style={style}
            keyMap={keyMap}
            handlers={handlers}
            focused
          >
            <Snackbar/>
            {children}
          </HotKeys>
        )}
      </DocumentTitle>
    ) : (
      <div className={styles.Loading}>
        <CircularProgress/>
      </div>
    )
  }

  componentDidMount() {
    if (!process.env.REACT_APP_MOCK) this.props.enterPage()
  }

  componentWillUnmount() {
    if (!process.env.REACT_APP_MOCK) this.props.exitPage(this.page)
  }
}

export default connectTo(
  state => ({
    page: state.navigation.page,
    stateReceived: state.cache.stateReceived[state.navigation.page]
  }),
  { enterPage, exitPage },
   withStyles(styles)(PageWrapper)
)