import { put, takeLatest } from "redux-saga/effects";
import { getQuotes } from "./quotesCrud";

export const actionTypes = {
  SetModalShow: "[SetModalShow] Action",
  GetQuotes: "[GetQuotes] Action",
  GetQuotesSuccess: "[GetQuotesSuccess] Action",
};

const initialQuotesState = {
  quotes: [],
  loading: false,
  show: {
    approve: false,
    reject: false,
    comment: false,
  }
};

export const reducer = (state = initialQuotesState, action) => {
  switch (action.type) {
    case actionTypes.SetModalShow: {
      const { values } = action.payload;
      return {...state,  show: values};
    }
    case actionTypes.GetQuotes: {
      return {...state, loading: true };
    }
    case actionTypes.GetQuotesSuccess: {
      const { quotes } = action.payload;

      return {...state, quotes, loading: false };
    }
    default:
      return state;
  }
}


export const actions = {
  setModalShow: (values) => ({ type: actionTypes.SetModalShow, payload: { values } }),
  getQuotes: (searchFilter = {}) => ({ type: actionTypes.GetQuotes, payload: { searchFilter } }),
  getQuotesSuccess: (quotes) => ({ type: actionTypes.GetQuotesSuccess, payload: { quotes } }),
};

export function* saga() {
  yield takeLatest(actionTypes.GetQuotes, function* getQuotesRequested(action) {
    const { searchFilter } = action.payload;
    const { data } = yield getQuotes(searchFilter);
    const quotes = data.map((q) => {
      q.created_at = new Date(q.created_at).toLocaleString();
      return q;
    });

    yield put(actions.getQuotesSuccess(quotes));
  });
}
