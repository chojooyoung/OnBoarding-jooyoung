// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoAlias = require("craco-alias");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require("ts-jest");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require("./tsconfig.paths.json");

module.exports = {
  babel: {
    presets: [
      "@emotion/babel-preset-css-prop",
      "@babel/preset-env",
      "@babel/preset-typescript",
    ],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
  ],
  jest: {
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    },
    configure: {
      preset: "ts-jest",
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/src/",
      }),
    },
  },
};
