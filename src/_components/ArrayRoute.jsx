import React from 'react';
import { Route ,Switch} from 'react-router-dom';

export const ArrayRoute = ({ component: Component, patharray: Patharray, ...rest }) => (
    <Switch>
       { Patharray.map((element, i) =>
        <Route {...rest} path={element} render={props => (<Component {...props} />)} key={i} />
        )}
    </Switch>
)

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         loggedIn()
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// )