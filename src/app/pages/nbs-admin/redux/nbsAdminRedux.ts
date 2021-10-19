import {Action} from '@reduxjs/toolkit'
import {put, takeLatest} from 'redux-saga/effects'
import {UserModel} from '../../../../types'
import {getNBSAdmins} from './nbsAdminCRUD'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  NBSAdminsRequested: '[Request NBS Admins] Action',
  NBSAdminsLoaded: '[Load NBS Admins] Action',
}

const initialCustomerState: INBSAdminsState = {
  nbsAdmins: [],
  loading: false,
}

export interface INBSAdminsState {
  nbsAdmins: any
  loading: boolean
}

export const reducer = (
  state: INBSAdminsState = initialCustomerState,
  action: ActionWithPayload<INBSAdminsState>
) => {
  switch (action.type) {
    case actionTypes.NBSAdminsRequested: {
      return {...state, loading: true}
    }

    case actionTypes.NBSAdminsLoaded: {
      const nbsAdmins = action.payload?.nbsAdmins
      return {nbsAdmins, loading: false}
    }

    default:
      return state
  }
}

export const actions = {
  getNBSAdmins: () => ({
    type: actionTypes.NBSAdminsRequested,
    payload: {},
  }),
  NBSAdminsLoaded: (nbsAdmins: UserModel[]) => ({
    type: actionTypes.NBSAdminsLoaded,
    payload: {nbsAdmins},
  }),
}

export function* saga() {
  yield takeLatest(actionTypes.NBSAdminsRequested, function* nbsAdminsRequested() {
    const {data: nbsAdmins} = yield getNBSAdmins()
    yield put(actions.NBSAdminsLoaded(nbsAdmins))
  })
}
