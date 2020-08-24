// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  verbose: true,
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'ts'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'babel-jest',
  },
};
