import { createAction } from 'redux-act'

export const addUploadFiles= createAction()
export const removeUploadFiles= createAction()

export const uploadStart= createAction()
export const uploadProgress = createAction()
export const uploadFailure = createAction()
export const uploadSuccess= createAction()
