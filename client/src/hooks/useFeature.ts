import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeaturesStart } from '../slices/features';

// normally we wouldn't cross client/server boundaries like this,
// so to ensure types are across projects consistent a global types
// folder, built out definition file, etc. should be considered
import { Features } from "../../../server/controllers/features"

/**
 * React hook to access a feature flag.
 * @param {string} flag Name of the feature flag.
 * @returns {boolean} Boolean indicating if the feature is enabled.
 */
export function useFeature<K extends keyof Features>(flag: K): boolean {
  const dispatch = useDispatch();
  const { features, loading, error } = useSelector((state: any) => state.features);

  useEffect(() => {
    dispatch(fetchFeaturesStart());
  }, [dispatch]);

  if (loading || error) return false;
  return features[flag];
}
