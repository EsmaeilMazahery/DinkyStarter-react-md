import {
  combineReducers,
  createStore
} from 'redux'
import {
  reducer as formReducer
} from 'redux-form'

import navigation from './navigation'
import auth from './auth'
import cache from './cache'
import dialog from './dialog'
import loading from './loading'
import navbar from './navbar'
import editor from './editor'
import yourStories from './your-stories'
import story from './story'
import stories from './stories'
import generic from './generic'
import upload from './upload'

import city from './baseInfo/city'
import region from './baseInfo/region'
import reseller from './baseInfo/reseller'
import accounting from './baseInfo/accounting'

import {
  unauthorizeUser
} from '../_actions/auth'
import {
  receiveMockState
} from '../_actions/mock'

const form = () => formReducer

const getNewReducer = _ =>
  combineReducers(
    Object.entries({
      navigation,
      auth,
      cache,
      dialog,
      form,
      loading,
      navbar,
      editor,
      yourStories,
      story,
      stories,
      generic,
      upload,

      city,
      region,
      reseller,
      accounting

    }).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value()
      }), {}
    )
  )

const reducer = getNewReducer()

export default (state, action) => {
  if (action.type === unauthorizeUser.getType()) {
    return reducer(createStore(getNewReducer()).getState())
  }

  if (action.type === receiveMockState.getType()) {
    return reducer(action.payload)
  }

  return reducer(state, action)
}