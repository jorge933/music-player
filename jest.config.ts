import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  setupFilesAfterEnv: [
    "@testing-library/react-native/extend-expect",
    "./jest-setup.ts",
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!app/**/*.types.{ts,tsx}",
    "!app/((tabs)|constants|mocks|interfaces)/**/*",
  ],
  moduleDirectories: ["node_modules", "./app/utils"],
  verbose: true,
};

export default config;
