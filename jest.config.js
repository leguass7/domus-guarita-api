/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  bail: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  // coverageProvider: 'v8',
  // moduleFileExtensions:['js','ts','json'],
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  // testMatch: [ '**/__test__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[t]s?(x)*' ],
  // transform: {
  //   '*^.+\\.(ts|tsx)$':'ts-jest',
  // }
  moduleNameMapper: {
    '#/(.*)': '<rootDir>/src/$1',
    "#useCases/(.*)": "<rootDir>/src/useCases/$1",
    // '@alias/(.*)': '<rootDir>/src/path/to/alias/$1'
  },
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "jestGlobalMocks.ts",
    ".module.ts",
    "<rootDir>/src/app/main.ts",
    "<rootDir>/src/services/ExitHandlerService/*",
    "<rootDir>/src/services/LoggerService/*",
    ".mock.ts",
    "__test__"
],
};
