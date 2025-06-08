// import { takeLatest } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchFeaturesStart,
  fetchFeaturesSuccess,
  fetchFeaturesFailure,
} from './features';

// normally we wouldn't cross client/server boundaries like this,
// so to ensure types are across projects consistent a global types
// folder, built out definition file, etc. should be considered
import { Features } from "../../../server/controllers/features"

function fetchFeaturesApi() {
  return fetch("/api/features").then(res => {
    if (!res.ok) throw new Error('Failed to fetch feature flags');
    return res.json();
  });
}

function* fetchFeaturesSaga() {
  try {
    const features: Features = yield call(fetchFeaturesApi);
    yield put(fetchFeaturesSuccess(features));
  } catch (e: any) {
    yield put(fetchFeaturesFailure(e.message));
  }
}

export default function* featuresRootSaga() {
  yield takeLatest(fetchFeaturesStart.type, fetchFeaturesSaga);
}
