import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga';

import errorSlice from "./slices/error";
import featuresSlice from './slices/features';
import featuresRootSaga from './slices/featuresSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    error: errorSlice,
    features: featuresSlice,
  },
  middleware: (getDefault) => getDefault().concat(sagaMiddleware),
});

sagaMiddleware.run(featuresRootSaga);

// types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
