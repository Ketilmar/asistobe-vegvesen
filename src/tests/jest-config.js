
// kan brukes ved å endre 'package.json' til: "test": "jest --config src/tests/jest-config.js"
// sjekk ut: https://stackoverflow.com/questions/60372790/node-v13-jest-es6-native-support-for-modules-without-babel-or-esm
// for å kjøre jest med 'import', satt jeg denne opsjonen i package.json: 
//      "scripts": {
//          "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js --config src/tests/jest-config.js"


export default {
    testEnvironment: 'jest-environment-node',
    transform: {},
    collectCoverage: true
};