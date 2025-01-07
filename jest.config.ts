import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["app/**/*.{js,jsx,ts,tsx}"],
};

export default config;
