// done this way to ensure no bogus data is assumed correct
export enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

// naming should be agnostic of the underlying vendor
export interface Config {
  env: Environment;
  port: number;
}

export const config: Config = {
  env: Environment[
    (process.env.NODE_ENV || "development") as keyof typeof Environment
  ],
  port: parseInt(process.env.PORT ?? "5000", 10) || 5_000,
};

export default config;
