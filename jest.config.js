/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const path = require("path");

/** @type {import('jest').Config} */
const config = {
  testMatch: ["**/tests/**/*.test.[jt]s?(x)"],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ["fake-indexeddb/auto"],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(js|ts|tsx)$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": path.resolve(__dirname, "./tests/mocks/static-file.js"),
  },
};

module.exports = config;
