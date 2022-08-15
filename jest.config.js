module.exports = {
    "transform": {
        "\\.[j]sx?$": "babel-jest"
    },
    "testMatch": ["**/?(*.)+(spec|test).[jt]s?(x)"],
    "setupFiles": ["./src/__tests__/setupTests.js"],
    // https://github.com/testing-library/react-testing-library/issues/422#issuecomment-518007141
    "testEnvironment": "jsdom"
};