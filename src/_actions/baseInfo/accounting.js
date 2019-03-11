import { createAction } from 'redux-act'

export const List = createAction()
export const receiveList = createAction()

export const Get = createAction()
export const receiveGet = createAction()

export const Update = createAction()
export const successfulUpdate = createAction()

export const Register = createAction()
export const successfulRegister = createAction()

export const Delete = createAction()
export const successfulDelete = createAction()

export const Filter = createAction()
export const receiveFilter = createAction()