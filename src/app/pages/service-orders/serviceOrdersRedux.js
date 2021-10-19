import { put, takeLatest } from "redux-saga/effects";
import { getServiceOrders } from "./serviceOrdersCrud";

export const actionTypes = {
  GetServiceOrders: "[GetServiceOrders] Action",
  GetServiceOrdersSuccess: "[GetServiceOrdersSuccess] Action",
};

const initialQuotesState = {
  serviceOrders: [],
};

export const reducer = (state = initialQuotesState, action) => {
  switch (action.type) {
    case actionTypes.GetServiceOrdersSuccess: {
      const { serviceOrders } = action.payload;

      return {...state, serviceOrders };
    }
    default:
      return state;
  }
}


export const actions = {
  getServiceOrders: (searchFilter = {}) => ({ type: actionTypes.GetServiceOrders, payload: { searchFilter } }),
  getServiceOrdersSuccess: (serviceOrders) => ({ type: actionTypes.GetServiceOrdersSuccess, payload: { serviceOrders } }),
};

export function* saga() {
  yield takeLatest(actionTypes.GetServiceOrders, function* getServiceOrdersRequested(action) {
    const { searchFilter } = action.payload;
    const { data } = yield getServiceOrders(searchFilter);
    const serviceOrders = data.map((q) => {
      q.created_at = new Date(q.created_at).toLocaleString();
      return q;
    });

    yield put(actions.getServiceOrdersSuccess(serviceOrders));
  });
}
