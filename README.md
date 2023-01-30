``# EThos Sui Wallet

A chrome (v88+) extension wallet for [Sui](https://sui.io) by [Ethos](https://https://ethoswallet.xyz).

# Set Up

**Requirements**: Node 14.0.0 or later.

Currently the Wallet depends on an unreleased version of `sui.js`, the TypeScript SDK for Sui. Therefore, you need to build the SDK first:

```bash
$ cd <Your Sui Repository>/sdk/typescript
$ yarn && yarn build
```

Then, in the project directory, run:

```bash
$ npm i
```

> **Note:** If you are updating the SDK and Wallet at the same time, you need to run the following commands to make sure the Explorer depends on the updated SDK.

```bash
$ cd <Your Sui Repository>/sdk/typescript
$ yarn build

$ cd ../../wallet
$ rm -rf node_modules/ && npm i
```

Then one of the following build steps is required:

## Build in watch mode (dev)

To build the extension and watch for changes run:

```
npm start
```

This will build the app in the [dist/](./dist/) directory, watch for changes and rebuild it. (Also runs prettier to format the files that changed.)

## Build once in dev mode

To build the app once in development mode (no optimizations etc) run

```
npm run build:dev
```

The output directory is the same [dist/](./dist/), all build artifacts will go there

## Build once in prod mode

To build the app once in production mode run

```
npm run build:final
```

Same as above the output is [dist/](./dist/).

## Install the extension to Chrome

After building the app, the extension needs to be installed to Chrome. Follow the steps to [load an unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked) and install the app from the [dist/](./dist/) directory.

## Testing

```
npm run test
```

## React DevTools

If you open the chrome dev tools on the extension, you will notice that the React dev tools are not there, even if you installed them from the chrome store. For security reasons this doesn't work, but there is a workaround, which is to use the react devtools in standalone mode. Simple run the following from a terminal:

```
npx react-devtools
```

...and a window will pop up that allows you to inspect the react component hierarchy and also run the profiler (in the development build of the app only!)

One shortcoming is that hovering over elements in the extension app won't highlight the corresponding React component in the devtools.
