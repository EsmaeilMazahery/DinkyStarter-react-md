import { takeLatest } from 'redux-saga/effects'

import * as cityActions from '../_actions/baseInfo/city'
import * as citySagas from './baseInfo/city'

import * as regionActions from '../_actions/baseInfo/region'
import * as regionSagas from './baseInfo/region'

import * as resellerActions from '../_actions/baseInfo/reseller'
import * as resellerSagas from './baseInfo/reseller'

import * as accountingActions from '../_actions/baseInfo/accounting'
import * as accountingSagas from './baseInfo/accounting'

import * as genericActions from '../_actions/generic'
import * as genericSagas from './generic'

import * as authActions from '../_actions/auth'
import * as authSagas from './auth'

import * as editorActions from '../_actions/editor'
import * as editorSagas from './editor'

import * as yourStoriesActions from '../_actions/your-stories'
import * as yourStoriesSagas from './your-stories'

import * as storyActions from '../_actions/story'
import * as storySagas from './story'

import * as uploadActions from '../_actions/upload'
import * as uploadSagas from './upload'

export default function* saga() {
  const relations = [
    [cityActions, citySagas],
    [regionActions, regionSagas],
    [resellerActions, resellerSagas],
    [accountingActions, accountingSagas],

    [genericActions, genericSagas],
    [uploadActions, uploadSagas],
    [authActions, authSagas],
    [editorActions, editorSagas],
    [yourStoriesActions, yourStoriesSagas],
    [storyActions, storySagas]
  ]

  for (const [actions, sagas] of relations) {
    for (const [actionName, action] of Object.entries(actions)) {
      const saga = sagas[actionName]
      if (saga) yield takeLatest(action.getType(), saga)
    }
  }
}
