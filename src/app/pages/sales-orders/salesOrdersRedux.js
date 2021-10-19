import { put, takeLatest } from "redux-saga/effects";
import { getSalesOrders } from "./salesOrdersCrud";

export const actionTypes = {
  GetSalesOrders: "[GetSalesOrders] Action",
  GetSalesOrdersSuccess: "[GetSalesOrdersSuccess] Action",
};

const initialQuotesState = {
  salesOrders: [],
};

export const reducer = (state = initialQuotesState, action) => {
  switch (action.type) {
    case actionTypes.GetSalesOrdersSuccess: {
      const { salesOrders } = action.payload;

      return {...state, salesOrders };
    }
    default:
      return state;
  }
}


export const actions = {
  getSalesOrders: (searchFilter = {}) => ({ type: actionTypes.GetSalesOrders, payload: { searchFilter } }),
  getSalesOrdersSuccess: (salesOrders) => ({ type: actionTypes.GetSalesOrdersSuccess, payload: { salesOrders } }),
};

export function* saga() {
  yield takeLatest(actionTypes.GetSalesOrders, function* getSalesOrdersRequested(action) {
    const { searchFilter } = action.payload;
    const { data } = yield getSalesOrders(searchFilter);
    const salesOrders = data.map((q) => {
      q.created_at = new Date(q.created_at).toLocaleString();
      return q;
    });
    
    yield put(actions.getSalesOrdersSuccess(salesOrders));
  });
}
