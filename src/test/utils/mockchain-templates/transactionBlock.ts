import type { SuiTransactionBlockResponse } from '@mysten/sui.js/src/types/transactions';

export const makeCoinTransactionBlock = (
    toAddress: string,
    fromAddress: string,
    receivedMist: number,
    createdCoinObjectId: string
): SuiTransactionBlockResponse => {
    const computationCost = 100;
    const storageCost = 200;
    const storageRebate = 100;
    const nonRefundableStorageFee = 100;
    const totalGas = computationCost + (storageCost - storageRebate);
    return {
        digest: '4dbXB7Sym5jdJozqtr4MLeJXM6AzhnkrwXBkkdh2r4gg',
        transaction: {
            data: {
                messageVersion: 'v1',
                transaction: {
                    kind: 'ProgrammableTransaction',
                    inputs: [
                        {
                            type: 'pure',
                            valueType: 'u64',
                            value: receivedMist.toString(),
                        },
                        {
                            type: 'pure',
                            valueType: 'address',
                            value: toAddress,
                        },
                    ],
                    transactions: [
                        {
                            SplitCoins: [
                                'GasCoin',
                                [
                                    {
                                        Input: 0,
                                    },
                                ],
                            ],
                        },
                        {
                            TransferObjects: [
                                [
                                    {
                                        Result: 0,
                                    },
                                ],
                                {
                                    Input: 1,
                                },
                            ],
                        },
                    ],
                },
                sender: fromAddress,
                gasData: {
                    payment: [
                        {
                            objectId:
                                '0x0b14de5b883ac5efef3fba247bc49c57879a6948ac2581f0379fdc6b2ddeb910',
                            version: 63873,
                            digest: 'F9PXnwB8r94WutVBu1TxCbFxxUuZaE3zcurVEQUn6TWh',
                        },
                    ],
                    owner: fromAddress,
                    price: '999',
                    budget: '3974000',
                },
            },
            txSignatures: [
                'AFGlKHdpJreEW4fuySUTSROSu6GCfb0cDScRtef2woNsJ+Pw5kn10Y/2GOJQYd0E2Geoj/bEwJZPYoBISAbLzwnYC6GouoRRYun0gxZIhdREeHAF16zp12EAiWi8v4UKXg==',
            ],
        },
        effects: {
            messageVersion: 'v1',
            status: {
                status: 'success',
            },
            executedEpoch: '777',
            gasUsed: {
                computationCost: computationCost.toString(),
                storageCost: storageCost.toString(),
                storageRebate: storageRebate.toString(),
                nonRefundableStorageFee: nonRefundableStorageFee.toString(),
            },
            modifiedAtVersions: [
                {
                    objectId:
                        '0x0b14de5b883ac5efef3fba247bc49c57879a6948ac2581f0379fdc6b2ddeb910',
                    sequenceNumber: '63873',
                },
            ],
            transactionDigest: '4dbXB7Sym5jdJozqtr4MLeJXM6AzhnkrwXBkkdh2r4gg',
            created: [
                {
                    owner: {
                        AddressOwner: toAddress,
                    },
                    reference: {
                        objectId: createdCoinObjectId,
                        version: 63874,
                        digest: 'HEGEeuJnyZSVTa2Y9FfJpRLrGEWj4uGa845jnqwLFwsG',
                    },
                },
            ],
            mutated: [
                {
                    owner: {
                        AddressOwner: fromAddress,
                    },
                    reference: {
                        objectId:
                            '0x0b14de5b883ac5efef3fba247bc49c57879a6948ac2581f0379fdc6b2ddeb910',
                        version: 63874,
                        digest: 'J4ni7948zvdZTVEr9HeYgSeKnsrd6BhTtk5pxjYM4onT',
                    },
                },
            ],
            gasObject: {
                owner: {
                    AddressOwner: fromAddress,
                },
                reference: {
                    objectId:
                        '0x0b14de5b883ac5efef3fba247bc49c57879a6948ac2581f0379fdc6b2ddeb910',
                    version: 63874,
                    digest: 'J4ni7948zvdZTVEr9HeYgSeKnsrd6BhTtk5pxjYM4onT',
                },
            },
            dependencies: ['CoruTJ1ty2rZ4w3YTM5REHU6Yb7GRkj5XSJamxQ9eoao'],
        },
        events: [],
        objectChanges: [
            {
                type: 'mutated',
                sender: fromAddress,
                owner: {
                    AddressOwner: fromAddress,
                },
                objectType: '0x2::coin::Coin<0x2::sui::SUI>',
                objectId:
                    '0x0b14de5b883ac5efef3fba247bc49c57879a6948ac2581f0379fdc6b2ddeb910',
                version: '63874',
                previousVersion: '63873',
                digest: 'J4ni7948zvdZTVEr9HeYgSeKnsrd6BhTtk5pxjYM4onT',
            },
            {
                type: 'created',
                sender: fromAddress,
                owner: {
                    AddressOwner: toAddress,
                },
                objectType: '0x2::coin::Coin<0x2::sui::SUI>',
                objectId: createdCoinObjectId,
                version: '63874',
                digest: 'HEGEeuJnyZSVTa2Y9FfJpRLrGEWj4uGa845jnqwLFwsG',
            },
        ],
        balanceChanges: [
            {
                owner: {
                    AddressOwner: toAddress,
                },
                coinType: '0x2::sui::SUI',
                amount: receivedMist.toString(),
            },
            {
                owner: {
                    AddressOwner: fromAddress,
                },
                coinType: '0x2::sui::SUI',
                amount: (-receivedMist - totalGas).toString(),
            },
        ],
        timestampMs: '1683157484447',
        checkpoint: '2721190',
    };
};
