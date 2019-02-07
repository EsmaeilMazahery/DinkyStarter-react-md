import {
    createReducer
} from 'redux-act'

import * as a from '../_actions/dialog'

const getDefaultState = _ => ({
    dialogContent:null,
    dialogTitle:"",
    openDialog:false, 
    closeDialog:()=>{}
})

export default _ =>
    createReducer({
            [a.loadDialog]: (state, { dialogContent, dialogTitle, openDialog,closeDialog }) => ({
                ...state,
                dialogContent,
                dialogTitle,
                openDialog,
                closeDialog
            }),
            [a.openDialog]: (state) => ({
                ...state,
                openDialog: true,
            }),
            [a.closeDialog]: (state) => ({
                ...state,
                openDialog:false,
            }),
            [a.removeDialog]: () => ({})
        },
        getDefaultState()
    )