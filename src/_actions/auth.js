import { createAction } from 'redux-act'

export const submitLogin = createAction()
export const submitForgetPassword = createAction()

export const receiveAuthData = createAction()
export const unauthorizeUser = createAction()
export const changeBackAddress = createAction()