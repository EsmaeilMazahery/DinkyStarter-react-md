import {
    createReducer
} from 'redux-act'

import * as a from '../_actions/loading'

const getDefaultState = _ => ({
    open:false, 
    closeButton:false, 
})

export default _ =>
    createReducer({
            [a.openLoading]: (state) => ({
                ...state,
                open: true,
            }),
            [a.closeLoading]: (state) => ({
                ...state,
                open:false,
            }),
        },
        getDefaultState()
    )