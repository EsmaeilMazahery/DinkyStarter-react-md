import {
  createReducer
} from 'redux-act'
import * as a from '../_actions/navigation'

import {
  loggedIn
} from '../_utils/auth'

const getDefaultState = page => ({
  page,
  storyId: undefined
})

export default _ =>
  createReducer({
      [a.to]: (state, page) => {
        window.location = page
        return ({
          state,
          page
        })
      },
      [a.toStory]: (state, storyId) => ({
        ...state,
        page: 'story',
        storyId
      }),
    },
    getDefaultState(process.env.REACT_APP_MOCK ?
      undefined :
      loggedIn() ? '' : 'login'
    )
  )