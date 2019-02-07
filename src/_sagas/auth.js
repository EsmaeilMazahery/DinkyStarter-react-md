import { put, call } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'

import { to } from '../_actions/navigation'
import { receiveAuthData } from '../_actions/auth'
import { LOGIN,FORGETPASSWORD } from '../_constants/api'
import { post } from '../_utils/api'
import { startApp } from '../_actions/generic'

const authSaga = (url, thanGoTo) =>
  function*({ payload: { values, reject } }) {
    try {
      const authData = yield call(post, url, values)
      console.log(authData)
      yield put(receiveAuthData(authData))
      yield put(startApp())
      yield put(to(thanGoTo))
    } catch ({ status, message }) {
      yield call(reject, new SubmissionError(message))
    }
  }

export const submitLogin = authSaga(LOGIN, '/')
export const submitForgetPassword = authSaga(FORGETPASSWORD, 'login')
