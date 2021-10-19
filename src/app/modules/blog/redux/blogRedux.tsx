import {Action} from '@reduxjs/toolkit'
import {put, takeLatest} from 'redux-saga/effects'
import {BlogModel} from '../../../../types'
import {getBlogs} from './blogCRUD'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  BlogsRequested: '[Request Blogs] Action',
  BlogsLoaded: '[Load Blogs] Action',
}

const initialBlogState: IBlogsState = {
  blogs: [],
  loading: false,
}

export interface IBlogsState {
  blogs: any
  loading: boolean
}

export interface BlogFilter {
  slug: string | null,
  from: Date | string | null,
  to: Date | string | null
}

export const reducer = (
  state: IBlogsState = initialBlogState,
  action: ActionWithPayload<IBlogsState>
) => {
  switch (action.type) {
    case actionTypes.BlogsRequested: {
      return {...state, loading: true}
    }

    case actionTypes.BlogsLoaded: {
      const blogs = action.payload?.blogs
      return {blogs, loading: false}
    }

    default:
      return state
  }
}

export const actions = {
  getBlogs: (filter: BlogFilter) => ({
    type: actionTypes.BlogsRequested,
    payload: {filter},
  }),
  blogsLoaded: (blogs: BlogModel[]) => ({
    type: actionTypes.BlogsLoaded,
    payload: {blogs},
  }),
}

export function* saga() {
  yield takeLatest(
    actionTypes.BlogsRequested,
    function* blogsRequested(action: any) {
      const {data: blogs} = yield getBlogs(action.payload.filter)
      yield put(actions.blogsLoaded(blogs))
    }
  )
}
