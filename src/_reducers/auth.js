import { createReducer } from 'redux-act'

import * as a from '../_actions/auth'
import { takeIfExists } from '../_utils/localStorage'

const getDefaultState = _ => ({
  token: takeIfExists('token'),
  id: takeIfExists('id'),
  tokenExpirationTime: takeIfExists('tokenExpirationTime', Number),
  backAddress:"/"
})

export default _ =>
  createReducer(
    {
      [a.receiveAuthData]: (state, { token, tokenExpirationTime, id }) => ({
        ...state,
        id,
        token,
        tokenExpirationTime
      }),
       [a.changeBackAddress]: (state, { backAddress }) => ({
        ...state,
        backAddress
      }),
      [a.unauthorizeUser]: () => ({})
    },
    getDefaultState()
  )
