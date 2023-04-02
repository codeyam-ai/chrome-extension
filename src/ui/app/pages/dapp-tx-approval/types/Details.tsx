import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';

import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { useFormatCoin } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { AnalyzeChangesResult } from '../lib/analyzeChanges';
import type { ReactNode } from 'react';

type Owner =
    | {
          AddressOwner: string;
      }
    | {
          ObjectOwner: string;
      }
    | {
          Shared: {
              initial_shared_version: number;
          };
      }
    | 'Immutable';

const owner = (owner?: Owner) => {
    if (!owner) return 'Immutable';
    if (typeof owner === 'string') return owner;
    if ('AddressOwner' in owner) return owner.AddressOwner;
    if ('ObjectOwner' in owner) return owner.ObjectOwner;
    return 'Immutable';
};

const Row = ({ title, value }: { title: string; value?: string }) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <Body isSemibold={!value}>{title}</Body>
            <Body isSemibold>{value && value}</Body>
        </div>
    );
};

const Section = ({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) => {
    return (
        <div className="flex flex-col gap-3">
            <BodyLarge
                isSemibold
                className="text-size-ethos-subheader text-[#9040F5]"
            >
                {title}
            </BodyLarge>
            {children}
        </div>
    );
};

const BalanceChanges = ({ analysis }: { analysis: AnalyzeChangesResult }) => {
    if (analysis.dryRunResponse.balanceChanges.length === 0) return null;

    const ownerChanges = analysis.dryRunResponse.balanceChanges.sort((a, b) =>
        owner(a.owner).localeCompare(owner(b.owner))
    );

    const BalanceRow = ({
        amount,
        coinType,
    }: {
        amount: string;
        coinType: string;
    }) => {
        const [formatted, symbol] = useFormatCoin(amount, coinType);

        return <Row title={symbol ?? coinType} value={formatted} />;
    };

    return (
        <Section title="Balance Changes">
            {ownerChanges.map((balanceChange, index) => {
                const o = owner(balanceChange.owner);
                const previousOwner = owner(ownerChanges[index - 1]?.owner);

                return (
                    <>
                        {(index === 0 || o !== previousOwner) && (
                            <Row
                                key={`row-balance-owner-${index}`}
                                title={`Owner: ${truncateMiddle(o)}`}
                            />
                        )}
                        <BalanceRow
                            key={`row-balance-${index}`}
                            {...balanceChange}
                        />
                    </>
                );
            })}
        </Section>
    );
};

const AssetChanges = ({ analysis }: { analysis: AnalyzeChangesResult }) => {
    if (analysis.dryRunResponse.objectChanges.length === 0) return <></>;

    const assetChanges = analysis.dryRunResponse.objectChanges.filter(
        (objectChange) =>
            !(
                'objectType' in objectChange &&
                objectChange.objectType.indexOf('0x2::coin::Coin') > -1
            )
    );

    if (assetChanges.length === 0) return <></>;

    return (
        <Section title="Asset (NFT) Changes">
            {assetChanges.map((objectChange, index) => {
                return (
                    <Row
                        key={`row-${index}`}
                        title={objectChange.type}
                        value={objectChange.type}
                    />
                );
            })}
        </Section>
    );
};

const Details = ({ analysis }: { analysis: AnalyzeChangesResult }) => {
    const [details, setDetails] = useState(false);

    const toggleDetails = useCallback(() => {
        setDetails((prev) => !prev);
    }, []);

    return (
        <div className="flex flex-col gap-6 pb-6 px-6">
            <div
                className="flex flex-row justify-between items-center cursor-pointer"
                onClick={toggleDetails}
            >
                <BodyLarge className="text-[#9040F5] underline">
                    More Details
                </BodyLarge>
                {details ? (
                    <ChevronUpIcon color="#9040F5" width={20} />
                ) : (
                    <ChevronDownIcon color="#9040F5" width={20} />
                )}
            </div>
            {details && (
                <div className="flex flex-col gap-6 divider-y divider-color-[#F0EBFE]">
                    <BalanceChanges analysis={analysis} />
                    <AssetChanges analysis={analysis} />
                </div>
            )}
        </div>
    );
};

export default Details;
