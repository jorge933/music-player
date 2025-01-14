import type { Config } from "jest";

const config: Config = {
  preset: "jest-expo",
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["./app/*.{ts,tsx,js,jsx}"],
  moduleDirectories: ["node_modules", "./app/utils"],
};

export default config;
