import {
  createReducer
} from 'redux-act'
import * as a from '../_actions/navbar'

const getState = () => ({
  NavBarList: [],
  NavBarList2: [],
  SideBarList: []
})

export default _ =>
  createReducer({
      [a.loadNavBar]: (state, {
        NavBarList
      }) => ({
        ...state,
        NavBarList,
      }),
      [a.loadNavBar2]: (state, {
        NavBarList2
      }) => ({
        ...state,
        NavBarList2,
      }),
      [a.loadSideBar]: (state, {
        SideBarList
      }) => ({
        ...state,
        SideBarList,
      }),
    },
    getState()
  )