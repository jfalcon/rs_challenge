import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// normally we wouldn't cross client/server boundaries like this,
// so to ensure types are across projects consistent a global types
// folder, built out definition file, etc. should be considered
import { Features } from "../../../server/controllers/features"

type FeaturesState = {
  features: Features;
  loading: boolean;
  error: string | null;
};

const initialState: FeaturesState = {
  features: {
    darkModeFilter: false,
    random: false,
  },
  loading: false,
  error: null,
};

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    fetchFeaturesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFeaturesSuccess(state, action: PayloadAction<Features>) {
      state.features = action.payload;
      state.loading = false;
    },
    fetchFeaturesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchFeaturesStart, fetchFeaturesSuccess, fetchFeaturesFailure
} = featuresSlice.actions;

export default featuresSlice.reducer;
