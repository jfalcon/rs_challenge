import { features } from "../features";

/**
 * React hook to access a feature flag.
 * @param {string} flag Name of the feature flag.
 * @returns {boolean} Boolean indicating if the feature is enabled.
 */
export function useFeature<K extends keyof typeof features>(flag: K): boolean {
  return features[flag];
}
