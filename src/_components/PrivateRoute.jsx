import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { loggedIn } from '../_utils/auth'
import { connectTo } from '../_utils/generic';
import { changeBackAddress } from '../_actions/auth'

export const MyRoute = ({ component: Component, children: Children, canActivate: CanActivate, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            !CanActivate || loggedIn()
                ? (Children ? <Component {...props} >{Children}</Component> : <Component {...props} />)
                : <MyRedirect location={props.location}  to={{ pathname: '/auth/login'}} />
        )} />
    )
}

class RedirectComponent extends PureComponent {
    componentDidMount() {
        if (this.props.location)
            this.props.changeBackAddress({ backAddress: this.props.location.pathname })
    }

    render() {
        const { ...rest } = this.props

        return (
            <Redirect {...rest} />
        )
    }
}

export const MyRedirect = (connectTo(
    state => ({
    }),
    { changeBackAddress },
    RedirectComponent))
