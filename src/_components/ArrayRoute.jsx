import React from 'react';
import { Route } from 'react-router-dom';

export const ArrayRoute = ({ component: Component,patharray:Patharray, ...rest }) => (
    Patharray.map((element, i) => 
        <Route {...rest} path={element} render={props => (<Component {...props} />)} key={i} />
    )
)

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         loggedIn()
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// )