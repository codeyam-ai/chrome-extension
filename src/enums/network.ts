/* eslint-disable no-unused-vars */
export enum Network {
    // DEVNET = 'http://127.0.0.1:9000',
    // DEVNET_FAUCET = 'http://127.0.0.1:9123/',
    // DEVNET = 'https://fullnode.devnet.sui.io/',
    DEVNET = 'https://00h4175td6.execute-api.us-east-1.amazonaws.com/sui?env=dev',
    DEVNET_FAUCET = 'https://faucet.devnet.sui.io/',
    // TESTNET = 'https://fullnode.testnet.sui.io/',
    TESTNET = 'https://00h4175td6.execute-api.us-east-1.amazonaws.com/sui?env=test',
    TESTNET_FAUCET = 'https://faucet.testnet.sui.io/',
}

export enum NetworkName {
    DEVNET = 'devnet',
    TESTNET = 'testnet',
}
