import {
    createReducer
} from 'redux-act'

import * as a from '../../_actions/baseInfo/accounting'

const getDefaultState = _ => ({
    accountingId: 0,

    name: "",

    list: [],
    allRows:10,
    page:0,
    

    listFilter:[],

    deleting: false,
    loading: false,
    saving: false
})

export default _ =>
    createReducer({
            [a.Get]: (state) => ({
                ...state,
                loading: true
            }),
            [a.receiveGet]: (state, {
                accountingId,
                name,
                region
            }) => ({
                ...state,
                accountingId,
                name,
                region,
                loading: false
            }),
            [a.List]: (state, {page,name}) => ({
                ...state,
                page,
                name,
                loading: true
            }),
            [a.receiveList]: (state, {
                list,
                allRows
            }) => ({
                ...state,
                list,
                allRows,
                loading: false
            }),
            [a.Register]: (state) => ({
                ...state,
                saving: true
            }),
            [a.successfulRegister]: (state, {
                accountingId
            }) => ({
                ...state,
                accountingId
            }),
            [a.Update]: (state) => ({
                ...state,
                saving: true
            }),
            [a.successfulUpdate]: (state) => ({
                ...state,
                saving: false
            }),
            [a.Delete]: (state) => ({
                ...state,
                deleting: true
            }),
            [a.successfulDelete]: (state) => ({
                ...state,
                deleting: false
            }),
            [a.receiveFilter]: (state, {
                listFilter
            }) => ({
                ...state,
                listFilter,
            }),
        },
        getDefaultState()
    )