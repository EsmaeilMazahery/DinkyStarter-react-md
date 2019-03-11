import { createReducer } from 'redux-act'
import * as a from '../_actions/generic'
import { takeIfExists } from '../_utils/localStorage';

const getDefaultState = () => ({
  pageWidth: window.innerWidth,
  pageHeight: window.innerHeight,
  mouseX: 0,
  mouseY: 0,
  snackbarMessage: '',
  rowsPerPage:10,
  companyName:takeIfExists("companyName")
})

export default () =>
  createReducer(
    {
      [a.changePageSize]: (state, { width, height }) => ({
        ...state,
        pageWidth: width,
        pageHeight: height
      }),
      [a.moveMouse]: (state, { mouseX, mouseY }) => ({
        ...state,
        mouseX,
        mouseY
      }),
      [a.changeRowsPerPage]: (state, { rowsPerPage }) => ({
        ...state,
        rowsPerPage
      }),
      [a.toggleSnackbar]: (state, snackbarMessage) => ({ ...state, snackbarMessage }),
      [a.receiveCompanyInfo]: (state, { companyName }) => ({
        ...state,
        companyName
      }),
    },
    getDefaultState()
  )

