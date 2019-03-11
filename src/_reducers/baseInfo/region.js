import {
    createReducer
} from 'redux-act'

import * as a from '../../_actions/baseInfo/region'

const getDefaultState = _ => ({
    regionId: 0,
    name: '',
    des: '',
    prePhone: '',

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
                regionId,
                name,
                des,
                prePhone
            }) => ({
                ...state,
                regionId,
                name,
                des,
                prePhone,
                loading: false
            }),
            [a.List]: (state) => ({
                ...state,
                loading: true
            }),
            [a.receiveList]: (state, {
                list
            }) => ({
                ...state,
                list,
                loading: false
            }),
            [a.Register]: (state) => ({
                ...state,
                saving: true
            }),
            [a.successfulRegister]: (state, {
                regionId
            }) => ({
                ...state,
                regionId
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