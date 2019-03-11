import { put, select } from 'redux-saga/effects'

import { post, patch,get,del } from '../../_utils/api'
import { callWith401Handle } from '../api'
import { REGISTER_PACKAGECAT, UPDATE_PACKAGECAT,SORT_PACKAGECAT, GET_PACKAGECAT, DELETE_PACKAGECAT, PACKAGECATS, PACKAGECATSFILTER } from '../../_constants/api';
import { successfulRegister, receiveGet, successfulUpdate,successfulSort, successfulDelete, receiveList, receiveFilter } from '../../_actions/baseInfo/packageCat';

export function* List({ payload: { name,region,page, rowsPerPage,excel } }) {
  const {list,allRows}  = yield callWith401Handle(get, PACKAGECATS, {name:name,region:region,page:page, rowsPerPage:rowsPerPage,excel:excel?true:false})
  yield put(receiveList({list,allRows,page}))
}

export function* Register({ payload: { name,color} }) {
    const { packageCatId } = yield callWith401Handle(post, REGISTER_PACKAGECAT, {name,color})
    yield put(successfulRegister(packageCatId))
}

export function* Update({ payload: {packageCatId, name,color} }) {
    yield callWith401Handle(patch, UPDATE_PACKAGECAT(packageCatId), {name,color})
    yield put(successfulUpdate())
}

export function* Sort({ payload: {packageCatId, isUp} }) {
  yield callWith401Handle(patch, SORT_PACKAGECAT, {id:packageCatId,isUp})
  yield put(successfulSort())
}

export function* Get({ payload: {packageCatId} }) {
    const { name,color } = yield callWith401Handle(get, GET_PACKAGECAT(packageCatId),{})
    yield put(receiveGet({packageCatId,name,color}))
}

export function* Delete() {
  const { city: { packageCatId} } = yield select()
    yield callWith401Handle(del, DELETE_PACKAGECAT,packageCatId)
    yield put(successfulDelete())
}

export function* Filter({ payload: { name,afterCall } }) {
  const { list}  = yield callWith401Handle(get, PACKAGECATSFILTER, {name:name})
  yield put(receiveFilter({listFilter:list}))
  yield afterCall(list[0].id);
}
