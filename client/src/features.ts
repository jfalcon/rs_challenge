export interface Features {
  darkModeFilter: boolean;
  random: boolean;
}

// remember, arrow functions are not hoisted
const somethingRandom = () => Math.random() >= 0.5;

// showing how custom logic can be used with flags
export const features: Features = {
  darkModeFilter: true,
  random: somethingRandom(),
} as const satisfies Record<string, boolean>;

export default features;
