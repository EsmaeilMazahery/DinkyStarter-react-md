import {
    createReducer
} from 'redux-act'

import * as a from '../../_actions/baseInfo/city'

const getDefaultState = _ => ({
    cityId: 0,

    name: "",
    region: 0,

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
                cityId,
                name,
                region
            }) => ({
                ...state,
                cityId,
                name,
                region,
                loading: false
            }),
            [a.List]: (state, {page,region,name}) => ({
                ...state,
                page,
                name,
                region,
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
                cityId
            }) => ({
                ...state,
                cityId
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