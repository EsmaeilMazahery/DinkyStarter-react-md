import {
  createLogger
} from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import {
  unauthorizeUser
} from './_actions/auth'

const logger = createLogger({
  predicate: (getState, action) => action.type !== '[51]' && action.type !== '[54]' && action.type !== '[52]' && action.type !== '[55]' && action.type !== '[53]'
});

export const sagaMiddleware = createSagaMiddleware()

const localStorageMiddleware = store => next => action => {
  if (action.type === unauthorizeUser.getType()) {
    localStorage.clear()
  }

  const prevState = store.getState()
  const result = next(action)
  const nextState = store.getState()

  if (prevState.auth.token !== nextState.auth.token && nextState.auth.token) {
    localStorage.setItem('token', nextState.auth.token)
    localStorage.setItem('tokenExpirationTime', nextState.auth.tokenExpirationTime)
    localStorage.setItem('id', nextState.auth.id)
    localStorage.setItem('email', nextState.auth.email)
  }
  return result
}

export default [sagaMiddleware, localStorageMiddleware, logger]