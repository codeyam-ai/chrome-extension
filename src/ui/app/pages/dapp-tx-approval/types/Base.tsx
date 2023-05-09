import { SUI_TYPE_ARG, TransactionBlock } from '@mysten/sui.js';
import { type ReactElement, useMemo, useState, useCallback } from 'react';

import truncateMiddle from '../../../helpers/truncate-middle';
import CopyBody from '../../../shared/typography/CopyBody';
import CopyAsset from '../CopyAsset';
import FormattedCoin from '../FormattedCoin';
import SectionElement from '../SectionElement';
import TabElement from '../TabElement';
import { useCategorizedEvents, useCustomSummary } from '../lib';
import finishTransaction from '../lib/finishTransaction';
import * as summaries from '../summaries';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import UserApproveContainer from '_src/ui/app/components/user-approve-container';
import { useFormatCoin } from '_src/ui/app/hooks';

import type { Detail } from '../DetailElement';
import type { Section } from '../SectionElement';
import type { SmallDetail } from '../SmallValue';
import type {
    SuiAddress,
    SuiObjectChange,
    TransactionEffects,
} from '@mysten/sui.js';
import type { ApprovalRequest } from '_src/shared/messaging/messages/payloads/transactions';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

export enum TxApprovalTab {
    SUMMARY = 'Summary',
    ASSETS = 'Assets',
    DETAILS = 'Details',
}

export type TabSections = {
    [key in TxApprovalTab]?: (Section | ReactElement)[];
};

export type BaseProps = {
    txID?: string;
    passphrase: string | null;
    authentication: string | null;
    accountInfos: AccountInfo[];
    activeAccountIndex: number;
    txRequest: ApprovalRequest | null;
    transactionBlock: TransactionBlock | null;
    objectChanges?: SuiObjectChange[] | null;
    effects?: TransactionEffects | null;
    address: SuiAddress | null;
    setDone: (done: boolean) => void;
};

const Base = ({
    address,
    passphrase,
    authentication,
    accountInfos,
    activeAccountIndex,
    txID,
    transactionBlock,
    txRequest,
    objectChanges,
    effects,
    setDone,
}: BaseProps) => {
    const { connectToLedger } = useSuiLedgerClient();
    const [tab, setTab] = useState(TxApprovalTab.SUMMARY);

    const summaryKey = useCustomSummary(txRequest);

    const { reading, mutating, creating, deleting, transferring, coinChanges } =
        useCategorizedEvents({
            normalizedFunction: undefined,
            objectChanges,
            address,
        });

    const gasUsed = effects?.gasUsed;
    const gas = gasUsed
        ? Number(gasUsed.computationCost) +
          (Number(gasUsed.storageCost) - Number(gasUsed.storageRebate))
        : null;

    const charges = useMemo(
        () => (coinChanges[SUI_TYPE_ARG] || 0) - (gas || 0),
        [coinChanges, gas]
    );
    const [formattedCharges, chargesSymbol, chargeDollars] = useFormatCoin(
        charges,
        SUI_TYPE_ARG
    );
    const [formattedGas, gasSymbol, gasDollars] = useFormatCoin(
        gas,
        SUI_TYPE_ARG
    );
    const [formattedTotal, totalSymbol, totalDollars] = useFormatCoin(
        coinChanges[SUI_TYPE_ARG],
        SUI_TYPE_ARG
    );

    const content: TabSections = useMemo(() => {
        if (txRequest?.tx.type !== 'transaction') return [] as TabSections;

        const transactionBlock = TransactionBlock.from(txRequest?.tx.data);

        const data = {
            address,
            transactionBlock,
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
        };

        let summary;
        switch (summaryKey) {
            // case 'redeem-ticket':
            //     summary = [
            //         <summaries.RedeemTicket
            //             key="redeem-ticket-summary"
            //             {...data}
            //         />,
            //     ];
            //     break;
            // case 'capy-vote':
            //     summary = [
            //         <summaries.CapyVote key="capy-vote-summary" {...data} />,
            //     ];
            //     break;
            // case 'capy-nominate':
            //     summary = [
            //         <summaries.CapyNominate
            //             key="capy-nominate-summary"
            //             {...data}
            //         />,
            //     ];
            //     break;
            default:
                summary = summaries.standard(data);
        }
        // const summary = summaries.standard(data);
        const anyPermissionsRequested =
            reading.length > 0 ||
            mutating.length > 0 ||
            transferring.length > 0 ||
            deleting.length > 0 ||
            Object.keys(coinChanges).length > 0;

        const anyAssetEffects =
            creating.length > 0 ||
            mutating.length > 0 ||
            transferring.length > 0 ||
            deleting.length > 0 ||
            Object.keys(coinChanges).length > 0;

        const assets = [
            {
                title: 'Permissions Requested',
                subtitle: anyPermissionsRequested
                    ? 'This transaction has requested access to your assets:'
                    : null,
                details: anyPermissionsRequested
                    ? [
                          {
                              label: 'Reading',
                              content: `${reading.length} Assets`,
                              detail: reading.map((r, i) => (
                                  <CopyAsset key={`reading-${i}`} {...r} />
                              )),
                          },
                          //   {
                          //       label: 'Modifying',
                          //       content: `${mutating.length} Assets`,
                          //       detail: mutating.map((m, i) => (
                          //           <CopyAsset key={`modifying-${i}`} {...m} />
                          //       )),
                          //   },
                          //   {
                          //       label: 'Transferring',
                          //       content: `${transferring.length} Assets`,
                          //       detail: transferring.map((t, i) => (
                          //           <CopyAsset key={`transferring-${i}`} {...t} />
                          //       )),
                          //   },
                          //   {
                          //       label: 'Full Access',
                          //       content: `${deleting.length} Assets`,
                          //       detail: deleting.map((d, i) => (
                          //           <CopyBody
                          //               key={`deleting-${i}`}
                          //               txt={d?.name || ''}
                          //           >
                          //               {truncateMiddle(d?.name)}
                          //           </CopyBody>
                          //       )),
                          //   },
                          {
                              label: 'Coins',
                              content: `${
                                  Object.keys(coinChanges).length
                              } Coins`,
                              detail: Object.keys(coinChanges).map(
                                  (c, index) => (
                                      <div
                                          key={`coin-detail-${index}`}
                                          className="text-xs"
                                      >
                                          <CopyBody
                                              key={`coins-${index}`}
                                              txt={c}
                                          >
                                              {truncateMiddle(c, 15)}
                                          </CopyBody>
                                      </div>
                                  )
                              ),
                          },
                      ]
                    : [
                          {
                              label: 'No access requested.',
                          },
                      ],
            } as Section,
            {
                title: 'Asset Effects',
                subtitle: anyAssetEffects
                    ? 'This transaction have the following effects on your assets (including creating new assets):'
                    : null,
                details: anyAssetEffects
                    ? [
                          // {
                          //     label: 'Creating',
                          //     content: `${creating.length} Assets`,
                          //     detail: creating.map((c, i) => (
                          //         <CopyAsset
                          //             key={`asset-creating-${i}`}
                          //             {...c}
                          //         />
                          //     )),
                          // },
                          // {
                          //     label: 'Modifying',
                          //     content: `${mutating.length} Assets`,
                          //     detail: mutating.map((m, i) => (
                          //         <CopyAsset
                          //             key={`asset-modifying-${i}`}
                          //             {...m}
                          //         />
                          //     )),
                          // },
                          // {
                          //     label: 'Transferring',
                          //     content: `${transferring.length} Assets`,
                          //     detail: transferring.map((t, i) => (
                          //         <CopyAsset
                          //             key={`asset-transferring-${i}`}
                          //             {...t}
                          //         />
                          //     )),
                          // },
                          // {
                          //     label: 'Deleting',
                          //     content: `${deleting.length} Assets`,
                          //     detail: deleting.map((d, i) => (
                          //         <CopyBody
                          //             key={`asset-deleting-${i}`}
                          //             txt={d?.name || ''}
                          //         >
                          //             {truncateMiddle(d?.name)}
                          //         </CopyBody>
                          //     )),
                          // },
                          {
                              label: 'Balances',
                              content: `${
                                  Object.keys(coinChanges).length
                              } Coins`,
                              detail: Object.keys(coinChanges).map(
                                  (c, index) => (
                                      <FormattedCoin
                                          key={`coin-detail-${index}`}
                                          type={c}
                                          amount={coinChanges[c] * -1}
                                      />
                                  )
                              ),
                          },
                      ]
                    : [
                          {
                              label: 'No effects on any of your assets.',
                          },
                      ],
            } as Section,
        ];

        const transactionDetails = {
            title: 'Transaction',
            details: [] as Detail[],
        };

        const details = [];

        if (transactionBlock?.blockData) {
            if (transactionBlock.blockData.gasConfig.budget) {
                transactionDetails.details.push({
                    label: 'Gas Budget',
                    content: {
                        type: 'small',
                        content: transactionBlock.blockData.gasConfig.budget,
                        coinType: SUI_TYPE_ARG,
                    } as SmallDetail,
                });
                // } else if (transaction.transactionData.commands.)
                // for (const attribute of [
                //     'packageObjectId',
                //     'module',
                //     'function',
                //     'arguments',
                //     'gasBudget',
                //     'gasPayment',
                // ]) {
                //     if (attribute in txInfo.data) {
                //         transactionDetails.data.push({
                //             label: attribute,
                //             content: {
                //                 type: 'small',
                //                 content: parsedData[attribute],
                //                 coinType: ['gasBudget'].includes(attribute)
                //                     ? SUI_TYPE_ARG
                //                     : null,
                //             } as SmallDetail,
                //         });
                //     }
            }
        }

        details.push(transactionDetails);

        details.push({
            title: 'Gas',
            details: [
                {
                    label: 'Computation',
                    content: {
                        type: 'small',
                        content: gasUsed?.computationCost || '---',
                        coinType: SUI_TYPE_ARG,
                    } as SmallDetail,
                },
                {
                    label: 'Storage Cost',
                    content: {
                        type: 'small',
                        content: gasUsed?.storageCost || '---',
                        coinType: SUI_TYPE_ARG,
                    } as SmallDetail,
                },
                {
                    label: 'Storage Rebate',
                    content: {
                        type: 'small',
                        content: gasUsed?.storageRebate || '---',
                        coinType: SUI_TYPE_ARG,
                    } as SmallDetail,
                },
                {
                    break: true,
                },
                {
                    label: 'Total',
                    content: {
                        type: 'small',
                        content: gas,
                        coinType: SUI_TYPE_ARG,
                    } as SmallDetail,
                },
            ],
        });

        return {
            [TxApprovalTab.SUMMARY]: summary,
            [TxApprovalTab.ASSETS]: assets,
            [TxApprovalTab.DETAILS]: details,
        };
    }, [
        txRequest?.tx,
        address,
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
        summaryKey,
        gasUsed?.computationCost,
        gasUsed?.storageCost,
        gasUsed?.storageRebate,
        gas,
    ]);

    const handleOnSubmit = useCallback(
        async (approved: boolean) => {
            const justSign =
                txRequest?.tx && 'justSign' in txRequest.tx
                    ? txRequest.tx.justSign
                    : undefined;
            const options =
                txRequest?.tx && 'options' in txRequest.tx
                    ? txRequest.tx.options
                    : undefined;
            const requestType =
                txRequest?.tx && 'requestType' in txRequest.tx
                    ? txRequest.tx.requestType
                    : undefined;
            await finishTransaction(
                connectToLedger,
                transactionBlock ?? null,
                txID,
                approved,
                passphrase,
                authentication ?? null,
                address,
                accountInfos,
                activeAccountIndex,
                justSign,
                options,
                requestType
            );
            setDone(true);
        },
        [
            txRequest,
            connectToLedger,
            transactionBlock,
            txID,
            passphrase,
            authentication,
            address,
            accountInfos,
            activeAccountIndex,
            setDone,
        ]
    );

    return txRequest ? (
        <UserApproveContainer
            title="Transaction Request"
            origin={txRequest.origin}
            originFavIcon={txRequest.originFavIcon}
            approveTitle="Approve"
            rejectTitle="Reject"
            onSubmit={handleOnSubmit}
        >
            <div className="flex flex-col gap-6 pb-6">
                <div className="flex flex-row gap-2 justify-between items-baseline px-6">
                    {[
                        TxApprovalTab.SUMMARY,
                        TxApprovalTab.ASSETS,
                        TxApprovalTab.DETAILS,
                    ]
                        .filter((t) => content[t])
                        .map((t, index) => (
                            <TabElement
                                key={`tab-${index}`}
                                type={t}
                                isSelected={t === tab}
                                setTab={setTab}
                            />
                        ))}
                </div>

                <div
                    id="content"
                    className="flex flex-col gap-6 w-full px-6 overflow-auto"
                >
                    {(content[tab] || []).map((section, sectionIndex) => (
                        <SectionElement
                            key={`section-${sectionIndex}`}
                            section={section}
                        />
                    ))}
                </div>
            </div>
        </UserApproveContainer>
    ) : (
        <></>
    );
};

export default Base;
