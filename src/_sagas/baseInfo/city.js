import { put, select } from 'redux-saga/effects'

import { post, patch,get,del } from '../../_utils/api'
import { callWith401Handle } from '../api'
import { REGISTER_CITY, UPDATE_CITY, GET_CITY, DELETE_CITY, CITIES, CITIESFILTER } from '../../_constants/api';
import { successfulRegister, receiveGet, successfulUpdate, successfulDelete, receiveList, receiveFilter } from '../../_actions/baseInfo/city';

export function* List({ payload: { name,region,page, rowsPerPage,excel } }) {
  const {list,allRows}  = yield callWith401Handle(get, CITIES, {name:name,region:region,page:page, rowsPerPage:rowsPerPage,excel:excel?true:false})
  yield put(receiveList({list,allRows,page}))
}

export function* Register({ payload: { name,region} }) {
    const { cityId } = yield callWith401Handle(post, REGISTER_CITY, {name,region})
    yield put(successfulRegister(cityId))
}

export function* Update({ payload: {cityId, name,region} }) {
    yield callWith401Handle(patch, UPDATE_CITY(cityId), {name,region})
    yield put(successfulUpdate())
}

export function* Get({ payload: {cityId} }) {
    const { name,region } = yield callWith401Handle(get, GET_CITY(cityId),{})
    yield put(receiveGet({cityId,name,region}))
}

export function* Delete() {
  const { city: { cityId} } = yield select()
    yield callWith401Handle(del, DELETE_CITY,cityId)
    yield put(successfulDelete())
}

export function* Filter({ payload: { name,regions,afterCall } }) {
  const { list}  = yield callWith401Handle(get, CITIESFILTER, {name:name,regions:regions})
  yield put(receiveFilter({listFilter:list}))
  yield afterCall(list[0].id);
}
