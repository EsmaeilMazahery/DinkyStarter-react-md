import {
    createReducer
} from 'redux-act'

import * as a from '../_actions/upload'

const getDefaultState = _ => ({
    files:[], 
    uploadedFiles:[],
    uploading:false,
    complate:false,
    failure:false,
    LastIndex:0
})

export default _ =>
    createReducer({
            [a.addUploadFiles]: (state,{file,folder,field,progress}) => ({
                ...state,
                LastIndex:state.LastIndex+1,
                files: [...state.files,{Index:state.LastIndex,file,folder,field,progress,UploadedUrl:''}],
            }),
            [a.removeUploadFiles]: (state,{field}) => ({
                ...state,
                files:state.files.filter((item)=>(field !== item.field)),
                uploadedFiles:state.uploadedFiles.filter((item)=>(field !== item.field)),
                uploading:false,
                complate:false,
                failure:false,
                LastIndex:state.files.filter((item)=>(field !== item.field)).length
            }),
            [a.uploadStart]: (state) => ({
                ...state,
                uploading:true,
            }), 
            [a.uploadProgress]: (state,{Index,progress}) =>{
                state.files[Index].progress=progress
                return({
                ...state,
                files:state.files,
                progress:progress,
            })},
            [a.uploadSuccess]: (state,{Index,url,field}) => ({
                ...state,
                files:state.files.filter((item)=>(Index!==item.Index)),
                uploadedFiles:[...state.uploadedFiles,{field,url}],
                complate:state.files.filter((item)=>(Index!==item.Index)).length===0,
            }),
            [a.uploadFailure]: (state) => ({
                ...state,
                failure:true,
            }),
        },
        getDefaultState()
    )



