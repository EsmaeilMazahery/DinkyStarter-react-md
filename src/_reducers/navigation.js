import {
  createReducer
} from 'redux-act'
import * as a from '../_actions/navigation'

import {
  unauthorizeUser
} from '../_actions/auth'
import {
  loggedIn
} from '../_utils/auth'

const getDefaultState = page => ({
  page,
  storyId: undefined
})

const forward = (state, page) => {
  window.location = page
  return ({
    state,
    page
  })
}

export default _ =>
  createReducer({
      [a.to]: forward,
      [a.toStory]: (state, storyId) => ({
        ...state,
        page: 'story',
        storyId
      }),
      [unauthorizeUser]: state => forward(state, 'login'),
    },
    getDefaultState(process.env.REACT_APP_MOCK ?
      undefined :
      loggedIn() ? '' : 'login'
    )
  )