import { put, takeLatest } from "redux-saga/effects";
import { getCalibrationReports } from "./calibrationReportsCrud";

export const actionTypes = {
  GetCalibrationReports: "[GetCalibrationReports] Action",
  GetCalibrationReportsSuccess: "[GetCalibrationReportsSuccess] Action",
};

const initialQuotesState = {
  calibrationReports: [],
};

export const reducer = (state = initialQuotesState, action) => {
  switch (action.type) {
    case actionTypes.GetCalibrationReportsSuccess: {
      const { calibrationReports } = action.payload;

      return {...state, calibrationReports };
    }
    default:
      return state;
  }
}


export const actions = {
  getCalibrationReports: (searchFilter = {}) => ({ type: actionTypes.GetCalibrationReports, payload: { searchFilter } }),
  getCalibrationReportsSuccess: (calibrationReports) => ({ type: actionTypes.GetCalibrationReportsSuccess, payload: { calibrationReports } }),
};

export function* saga() {
  yield takeLatest(actionTypes.GetCalibrationReports, function* getCalibrationReportsRequested(action) {
    const { searchFilter } = action.payload;
    const { data } = yield getCalibrationReports(searchFilter);
    const calibrationReports = data.map((q) => {
      q.created_at = new Date(q.created_at).toLocaleString();
      return q;
    });

    yield put(actions.getCalibrationReportsSuccess(calibrationReports));
  });
}
