import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  setupFilesAfterEnv: [
    "@testing-library/react-native/extend-expect",
    "./jest-setup.ts",
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["./app/*/**.{ts,tsx}"],
  moduleDirectories: ["node_modules", "./app/utils"],
  verbose: true,
};

export default config;
