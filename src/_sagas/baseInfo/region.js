import { put, select } from 'redux-saga/effects'

import { post, patch,get,del } from '../../_utils/api'
import { callWith401Handle } from '../api'
import { REGISTER_REGION, UPDATE_REGION, GET_REGION, DELETE_REGION, REGIONS, REGIONSFILTER } from '../../_constants/api';
import { successfulRegister, receiveGet, successfulUpdate, successfulDelete, receiveList } from '../../_actions/baseInfo/city';
import { receiveFilter } from '../../_actions/baseInfo/region';

export function* List() {
  const { regionFilter: { name } } = yield select()
  const list  = yield callWith401Handle(get, REGIONS, {name:name})
  yield put(receiveList({list}))
}

export function* Register() {
  const { region: { name,des,prePhone} } = yield select()
    const { regionId } = yield callWith401Handle(post, REGISTER_REGION, {name,des,prePhone})
    yield put(successfulRegister(regionId))
}

export function* Update() {
  const { region: { regionId,name,des,prePhone} } = yield select()
    yield callWith401Handle(patch, UPDATE_REGION(regionId), {name,des,prePhone})
    yield put(successfulUpdate())
}

export function* Get() {
  const { region: { regionId} } = yield select()
    const { name,des,prePhone } = yield callWith401Handle(get, GET_REGION(regionId),{})
    yield put(receiveGet({regionId,name,des,prePhone}))
}

export function* Delete() {
  const { region: { regionId} } = yield select()
    yield callWith401Handle(del, DELETE_REGION,regionId)
    yield put(successfulDelete())
}

export function* Filter({ payload: { name,afterCall } }) {
  const { list}  = yield callWith401Handle(get, REGIONSFILTER, {name:name})
  yield put(receiveFilter({listFilter:list}))
  yield afterCall(list[0].id);
}