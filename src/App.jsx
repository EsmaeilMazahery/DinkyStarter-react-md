import React from 'react'
import { Provider } from 'react-redux'
import './_utils/array-extensions'
import store from './store'
import saga from './_sagas'
import Routes from './Routes'
import { sagaMiddleware } from './middleware'
import { receiveMockState } from './_actions/mock'
import { loggedIn } from './_utils/auth'
import { startApp } from './_actions/generic'

import RTL from './_styles/RTL';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './_styles/theme';

import 'filepond/dist/filepond.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <RTL>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </RTL>
    </Provider>
  )
}

export default App

sagaMiddleware.run(saga)

loggedIn() && store.dispatch(startApp())

if (process.env.REACT_APP_MOCK) {
  import('./_mocks/state.js').then(module => {
    const state = store.getState()
    store.dispatch(
      receiveMockState(
        Object.entries(state).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: { ...value, ...module.MOCK_STATE[key] }
          }),
          {}
        )
      )
    )
  })
}
