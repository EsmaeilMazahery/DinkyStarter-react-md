import React from 'react'
import { connectTo } from '../_utils/generic'

class AuthLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <>
        {children}
      </>
    )
  }
}

export default connectTo(
  state => ({
  }),
  {},
  (AuthLayout)
)
