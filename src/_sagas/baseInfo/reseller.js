import { put, select } from 'redux-saga/effects'

import { post, patch,get,del } from '../../_utils/api'
import { callWith401Handle } from '../api'
import { REGISTER_RESELLER, UPDATE_RESELLER, GET_RESELLER, DELETE_RESELLER, RESELLERS, RESELLERSFILTER } from '../../_constants/api';
import { successfulRegister, receiveGet, successfulUpdate, successfulDelete, receiveList, receiveFilter } from '../../_actions/baseInfo/reseller';

export function* List({ payload: { name,page, rowsPerPage,excel } }) {
  const {list,allRows}  = yield callWith401Handle(get, RESELLERS, {name:name,page:page, rowsPerPage:rowsPerPage,excel:excel?true:false})
  yield put(receiveList({list,allRows,page}))
}

export function* Register({ payload: { ...parames} }) {
    const { resellerId } = yield callWith401Handle(post, REGISTER_RESELLER, {...parames})
    yield put(successfulRegister(resellerId))
}

export function* Update({ payload: {resellerId, ...rest} }) {
    yield callWith401Handle(patch, UPDATE_RESELLER(resellerId), {...rest})
    yield put(successfulUpdate())
}

export function* Get({ payload: {resellerId} }) {
    const { name,region } = yield callWith401Handle(get, GET_RESELLER(resellerId),{})
    yield put(receiveGet({resellerId,name,region}))
}

export function* Delete() {
  const { city: { resellerId} } = yield select()
    yield callWith401Handle(del, DELETE_RESELLER,resellerId)
    yield put(successfulDelete())
}

export function* Filter({ payload: { name,afterCall } }) {
  const { list}  = yield callWith401Handle(get, RESELLERSFILTER, {name:name})
  yield put(receiveFilter({listFilter:list}))
  yield afterCall(list[0].id);
}
