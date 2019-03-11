import { put, call } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'

import { to } from '../_actions/navigation'
import { receiveAuthData } from '../_actions/auth'
import { LOGIN,FORGETPASSWORD } from '../_constants/api'
import { post } from '../_utils/api'
import { startApp, toggleSnackbar } from '../_actions/generic'

const authSaga = (url, thanGoTo) =>
  function*({ payload: { values, reject } }) {
    try {
      const authData = yield call(post, url, values)
      yield put(receiveAuthData(authData))
      yield put(startApp())
      yield put(to(values.from || thanGoTo))
    } catch ({ status, message }) {
      yield put(toggleSnackbar("نام کاربری یا گذرواژه اشتباه است"))
      yield call(reject, new SubmissionError(message))
    }
  }

export const submitLogin = authSaga(LOGIN, '/')
export const submitForgetPassword = authSaga(FORGETPASSWORD, 'login')


export function* unauthorizeUser() {
  yield put(to('/auth/login'))
}