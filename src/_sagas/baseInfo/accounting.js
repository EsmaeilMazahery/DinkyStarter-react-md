import { put, select } from 'redux-saga/effects'

import { post, patch,get,del } from '../../_utils/api'
import { callWith401Handle } from '../api'
import { REGISTER_ACCOUNTING, UPDATE_ACCOUNTING, GET_ACCOUNTING, DELETE_ACCOUNTING, ACCOUNTINGS, ACCOUNTINGSFILTER } from '../../_constants/api';
import { successfulRegister, receiveGet, successfulUpdate, successfulDelete, receiveList, receiveFilter } from '../../_actions/baseInfo/accounting';

export function* List({ payload: { name,region,page, rowsPerPage,excel } }) {
  const {list,allRows}  = yield callWith401Handle(get, ACCOUNTINGS, {name:name,page:page, rowsPerPage:rowsPerPage,excel:excel?true:false})
  yield put(receiveList({list,allRows,page}))
}

export function* Register({ payload: { name} }) {
    const { accountingId } = yield callWith401Handle(post, REGISTER_ACCOUNTING, {name})
    yield put(successfulRegister(accountingId))
}

export function* Update({ payload: {accountingId, name} }) {
    yield callWith401Handle(patch, UPDATE_ACCOUNTING(accountingId), {name})
    yield put(successfulUpdate())
}

export function* Get({ payload: {accountingId} }) {
    const { name,region } = yield callWith401Handle(get, GET_ACCOUNTING(accountingId),{})
    yield put(receiveGet({accountingId,name,region}))
}

export function* Delete() {
  const { city: { accountingId} } = yield select()
    yield callWith401Handle(del, DELETE_ACCOUNTING,accountingId)
    yield put(successfulDelete())
}

export function* Filter({ payload: { name,afterCall } }) {
  const { list}  = yield callWith401Handle(get, ACCOUNTINGSFILTER, {name:name})
  yield put(receiveFilter({listFilter:list}))
  yield afterCall(list[0].id);
}
