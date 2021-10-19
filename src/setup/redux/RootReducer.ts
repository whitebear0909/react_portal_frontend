import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from '../../app/modules/auth'
import * as quotes from '../../app/pages/sales-quotes/quotesRedux'
import * as calibrationReports from '../../app/pages/calibration-reports/calibrationReportsRedux'
import * as serviceOrders from '../../app/pages/service-orders/serviceOrdersRedux'
import * as salesOrders from '../../app/pages/sales-orders/salesOrdersRedux'
import * as customers from '../../app/pages/customer/redux/customerRedux'
import * as nbsAdmins from '../../app/pages/nbs-admin/redux/nbsAdminRedux'
import * as blogs from '../../app/modules/blog/redux/blogRedux'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  quotes: quotes.reducer,
  calibrationReports: calibrationReports.reducer,
  serviceOrders: serviceOrders.reducer,
  salesOrders: salesOrders.reducer,
  customers: customers.reducer,
  nbsAdmins: nbsAdmins.reducer,
  blogs: blogs.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([
    auth.saga(),
    quotes.saga(),
    calibrationReports.saga(),
    salesOrders.saga(),
    serviceOrders.saga(),
    customers.saga(),
    nbsAdmins.saga(),
    blogs.saga(),
  ])
}
