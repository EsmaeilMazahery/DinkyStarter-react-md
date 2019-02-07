import React, { PureComponent } from 'react'
import { connectTo } from '../../_utils/generic';
import styles from './sidbar.module.scss';
import { withStyles } from '@material-ui/core/styles';
import { to } from '../../_actions/navigation'

import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

class Sidbar extends PureComponent {
  render() {
    const { open } = this.props
    return (
      <div className={classNames(styles.sidbar, {
        [styles.sidebaropen]: open,
        [styles.sidebarclose]: !open,
      })}>
        <Drawer
          variant="permanent"
          className={classNames(styles.drawer, {
            [styles.drawerOpen]: open,
            [styles.drawerClose]: !open,
          })}
          classes={{
            paper: classNames({
              [styles.drawerOpen]: open,
              [styles.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <div className={styles.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronRightIcon /> 
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  }
}

export default connectTo(
  state => ({
    open: false
  }),
  { to },
  withStyles(styles)(Sidbar)
)