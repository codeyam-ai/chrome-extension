import { GAS_TYPE_ARG } from '_src/ui/app/redux/slices/sui-objects/Coin';

import type { Permission, DistilledEffect } from '..';
import type { Detail } from '../DetailElement';
import type { NumberedDetail } from '../NumberedValue';
import type { Section } from '../SectionElement';
import type { MoveCallTransaction, SignableTransaction } from '@mysten/sui.js';

export type SummaryGeneratorArgs = {
    address?: string | null;
    txInfo?: string | SignableTransaction | MoveCallTransaction;
    reading: (DistilledEffect | null)[];
    mutating: DistilledEffect[];
    creating: DistilledEffect[];
    transferring: DistilledEffect[];
    deleting: DistilledEffect[];
    coinChanges: Record<string, number>;
    formattedCharges: string;
    chargesSymbol: string;
    chargeDollars: string;
    formattedGas: string;
    gasSymbol: string;
    gasDollars: string;
    formattedTotal: string;
    totalSymbol: string;
    totalDollars: string;
};

const standard = ({
    txInfo,
    reading,
    mutating,
    creating,
    transferring,
    deleting,
    coinChanges,
    formattedCharges,
    chargesSymbol,
    chargeDollars,
    formattedGas,
    gasSymbol,
    gasDollars,
    formattedTotal,
    totalSymbol,
    totalDollars,
}: SummaryGeneratorArgs) => {
    const permissions: Permission[] = [];

    if (reading.length > 0) {
        permissions.push({
            label: 'Reading',
            count: reading.length,
        });
    }

    if (mutating.length > 0) {
        permissions.push({
            label: 'Modifying',
            count: mutating.length,
        });
    }

    if (transferring.length > 0) {
        permissions.push({
            label: 'Transferring',
            count: transferring.length,
        });
    }

    if (deleting.length > 0) {
        permissions.push({
            label: 'Full Access',
            count: deleting.length,
        });
    }

    if (permissions.length === 0) {
        permissions.push({
            label: 'None Requested',
            count: 0,
        });
    }

    let summary: Section[] = [];

    if (txInfo && typeof txInfo !== 'string' && 'kind' in txInfo) {
        if (txInfo.kind === 'moveCall') {
            summary = [
                {
                    title: 'Requesting Permission To Call',
                    details: [
                        {
                            label: 'Contract',
                            content: txInfo.data.module,
                        },
                        {
                            label: 'Function',
                            content: txInfo.data.function,
                        },
                        {
                            label: 'Permissions',
                            content: permissions,
                        },
                    ],
                } as Section,
            ];
        } else if (txInfo.kind === 'transferObject') {
            summary = [
                {
                    title: 'Transfer Asset',
                    details: [
                        {
                            label: 'Asset',
                            content: transferring[0]?.name,
                        },
                        {
                            label: 'Recipient',
                            content: txInfo.data.recipient,
                        },
                    ],
                },
            ];
        } else if (txInfo.kind === 'transferSui') {
            summary = [
                {
                    title: 'Transfer Asset',
                    details: [
                        {
                            label: 'Amount',
                            content: txInfo.data.amount || '---',
                        },
                        {
                            label: 'Recipient',
                            content: txInfo.data.recipient,
                        },
                    ],
                },
            ];
        } else if (txInfo.kind === 'pay') {
            summary = [
                {
                    title: 'Transfer Asset',
                    details: [
                        {
                            label: 'Amount',
                            content: txInfo.data.amounts,
                        },
                        {
                            label: 'Recipient',
                            content: txInfo.data.recipients,
                        },
                    ],
                },
            ];
        } else if (txInfo.kind === 'paySui') {
            summary = [
                {
                    title: 'Transfer Asset',
                    details: [
                        {
                            label: 'Amount',
                            content: txInfo.data.amounts,
                        },
                        {
                            label: 'Recipient',
                            content: txInfo.data.recipients,
                        },
                    ],
                },
            ];
        } else if (txInfo.kind === 'payAllSui') {
            summary = [
                {
                    title: 'Transfer Asset',
                    details: [
                        {
                            label: 'Amount',
                            content: `${txInfo.data.inputCoins.length} Coins`,
                        },
                        {
                            label: 'Recipient',
                            content: txInfo.data.recipient,
                        },
                    ],
                },
            ];
        }
    }

    if (summary.length === 0) {
        summary = [
            {
                title: 'Transaction Summary',
                details: [
                    {
                        label: 'No summary available for this transaction yet.',
                    },
                ],
            },
        ];
    }

    if (
        creating.length > 0 ||
        mutating.length > 0 ||
        transferring.length > 0 ||
        deleting.length > 0 ||
        Object.keys(coinChanges).length > 1
    ) {
        const effects = {
            title: 'Effects',
            tooltip:
                'This transaction will have the following effects on the assets in your wallet.',
            details: [] as Detail[],
        } as Section;

        if (creating.length > 0) {
            effects.details.push({
                label: 'Creating',
                content: creating.map(
                    (creating) =>
                        ({
                            label: (creating?.name || '').toString(),
                            count: 1,
                        } as NumberedDetail)
                ),
            });
        }

        if (mutating.length > 0) {
            effects.details.push({
                label: 'Modifying',
                content: mutating.map(
                    (mutating) =>
                        ({
                            label: (mutating?.name ?? '').toString(),
                            count: 1,
                        } as NumberedDetail)
                ),
            });
        }

        if (transferring.length > 0) {
            effects.details.push({
                label: 'Transferring',
                content: transferring.map(
                    (transferring) =>
                        ({
                            label: (transferring?.name || '').toString(),
                            count: 1,
                        } as NumberedDetail)
                ),
            });
        }

        if (deleting.length > 0) {
            effects.details.push({
                label: 'Deleting',
                content: deleting.map(
                    (deleting) =>
                        ({
                            label: deleting.name,
                            truncate: true,
                            count: 1,
                        } as NumberedDetail)
                ),
            });
        }

        if (Object.keys(coinChanges).length > 1) {
            effects.details.push({
                label: 'Coins',
                content: Object.keys(coinChanges)
                    .filter((name) => name !== GAS_TYPE_ARG)
                    .map(
                        (coinName) =>
                            ({
                                label: coinName,
                                count: `${
                                    coinChanges[coinName] > 0 ? '' : '+'
                                }${coinChanges[coinName] * -1}`,
                                truncate: true,
                            } as NumberedDetail)
                    ),
            });
        }

        summary.push(effects);
    }

    const costs = {
        title: 'Costs',
        details: [
            {
                label: 'Charges',
                content: {
                    value: formattedCharges,
                    symbol: chargesSymbol,
                    dollars: chargeDollars,
                },
            },
            {
                label: 'Gas',
                content: {
                    value: formattedGas,
                    symbol: gasSymbol,
                    dollars: gasDollars,
                },
            },
            {
                break: true,
            },
            {
                label: 'Total',
                content: {
                    value: formattedTotal,
                    symbol: totalSymbol,
                    dollars: totalDollars,
                    total: true,
                },
            },
        ],
    };

    summary.push(costs);

    return summary;
};

export default standard;
