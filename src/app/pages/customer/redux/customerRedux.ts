import {Action} from '@reduxjs/toolkit'
import {put, takeLatest} from 'redux-saga/effects'
import {UserModel} from '../../../../types'
import {getCustomers, getCustomersOfCompany} from './customerCRUD'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  CustomersRequested: '[Request Customers] Action',
  CustomersLoaded: '[Load Customers] Action',
  CustomersOfUserRequested: '[Request Customers Of User] Action',
}

const initialCustomerState: ICustomersState = {
  customers: [],
  loading: false,
}

export interface ICustomersState {
  customers: any
  loading: boolean
}

export const reducer = (
  state: ICustomersState = initialCustomerState,
  action: ActionWithPayload<ICustomersState>
) => {
  switch (action.type) {
    case actionTypes.CustomersRequested: {
      return {...state, loading: true}
    }

    case actionTypes.CustomersLoaded: {
      const customers = action.payload?.customers
      return {customers, loading: false}
    }

    default:
      return state
  }
}

export const actions = {
  getCustomers: () => ({
    type: actionTypes.CustomersRequested,
    payload: {},
  }),
  getCustomersOfCompany: (companyId: string) => ({
    type: actionTypes.CustomersOfUserRequested,
    payload: {companyId},
  }),
  customersLoaded: (customers: UserModel[]) => ({
    type: actionTypes.CustomersLoaded,
    payload: {customers},
  }),
}

export function* saga() {
  yield takeLatest(actionTypes.CustomersRequested, function* customersRequested() {
    const {data: customers} = yield getCustomers()
    yield put(actions.customersLoaded(customers))
  })
  yield takeLatest(
    actionTypes.CustomersOfUserRequested,
    function* customersOfUserRequested(action: any) {
      const {data: customers} = yield getCustomersOfCompany(action.payload.companyId)
      yield put(actions.customersLoaded(customers))
    }
  )
}
