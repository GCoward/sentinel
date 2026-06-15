import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  roots: ["<rootDir>/src/__tests__"],
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
};

export default createJestConfig(config);
