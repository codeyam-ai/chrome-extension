import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { SUI_TYPE_ARG } from '@mysten/sui.js';
import { useCallback, useEffect, useState } from 'react';

import owner from '../lib/owner';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { useFormatCoin } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { AnalyzeChangesResult } from '../lib/analyzeChanges';
import type { RawSigner, SuiAddress, SuiObjectChange } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';
import type { ReactNode } from 'react';
import CopyToClipboard from '_src/ui/app/components/copy-to-clipboard';
import { TooltipDirection } from '_src/ui/app/components/Tooltip';

const Row = ({
    title,
    value,
    subvalue,
    truncate = true,
}: {
    title: string;
    value?: string;
    subvalue?: ReactNode;
    truncate?: boolean;
}) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <Body isSemibold={!value}>{title}</Body>
            <div className="text-right">
                {value && (
                    <div title={value}>
                        <Body>{truncate ? truncateMiddle(value) : value}</Body>
                    </div>
                )}
                {typeof subvalue === 'string' ? (
                    <div title={subvalue}>
                        <Body className="text-size-ethos-small text-[#74777C]">
                            {truncate ? truncateMiddle(subvalue, 18) : subvalue}
                        </Body>
                    </div>
                ) : (
                    subvalue
                )}
            </div>
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

const BalanceChanges = ({
    analysis,
    address,
}: {
    analysis: AnalyzeChangesResult;
    address?: SuiAddress;
}) => {
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

        return (
            <Row
                title={symbol ?? coinType}
                value={formatted}
                subvalue={coinType === SUI_TYPE_ARG ? undefined : coinType}
            />
        );
    };

    return (
        <Section title="Balance Changes">
            {ownerChanges.map((balanceChange, index) => {
                const o = owner(balanceChange.owner, address);
                const previousOwner = owner(
                    ownerChanges[index - 1]?.owner,
                    address
                );

                return (
                    <div key={`row-balance-${index}`}>
                        {(index === 0 || o !== previousOwner) && (
                            <Row title={`Owner: ${truncateMiddle(o)}`} />
                        )}
                        <BalanceRow {...balanceChange} />
                    </div>
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

    const Transfer = ({
        from,
        to,
        objectType,
    }: {
        from: string;
        to: string;
        objectType: string;
    }) => {
        return (
            <Row
                title="Transfer"
                value={`${truncateMiddle(from)} -> ${truncateMiddle(to)}`}
                subvalue={
                    <div title={objectType}>
                        <Body className="text-size-ethos-small text-[#74777C]">
                            {truncateMiddle(objectType, 18)}
                        </Body>
                    </div>
                }
                truncate={false}
            />
        );
    };

    const Mint = ({ type }: { type: string }) => {
        const typeParts = type.split('::');
        return <Row title="Mint" value={typeParts[2]} subvalue={type} />;
    };

    const changeTypes = (objectChange: SuiObjectChange) => {
        const types = [];
        if ('owner' in objectChange) {
            const to = owner(objectChange.owner);
            const from = objectChange.sender;
            if (from !== to) {
                types.push(
                    <Transfer
                        key={`asset-change-type-${types.length}`}
                        from={from}
                        to={to}
                        objectType={objectChange.objectType}
                    />
                );
            }
        }

        if (objectChange.type === 'created') {
            types.push(
                <Mint
                    key={`asset-change-type-${types.length}`}
                    type={objectChange.objectType}
                />
            );
        }
        return types;
    };

    return (
        <Section title="Asset (NFT) Changes">
            {assetChanges.map((objectChange, index) => {
                const id =
                    'objectId' in objectChange
                        ? objectChange.objectId
                        : objectChange.packageId;
                return (
                    <div key={`asset-change-${index}`}>
                        <Row key={`row-${index}`} title={truncateMiddle(id)} />
                        {changeTypes(objectChange)}
                    </div>
                );
            })}
        </Section>
    );
};

const RawOutput = ({ analysis }: { analysis: AnalyzeChangesResult }) => {
    const jsonDryRun = JSON.stringify(analysis.dryRunResponse, null, 4);

    return (
        <Section title="Raw Output">
            <CopyToClipboard txt={jsonDryRun} direction={TooltipDirection.DOWN}>
                <textarea className="rounded-lg text-sm">{jsonDryRun}</textarea>
            </CopyToClipboard>
        </Section>
    );
};

const Details = ({
    analysis,
    signer,
}: {
    analysis: AnalyzeChangesResult;
    signer: EthosSigner | RawSigner;
}) => {
    const [details, setDetails] = useState(false);
    const [address, setAddress] = useState<SuiAddress | undefined>(undefined);

    useEffect(() => {
        signer.getAddress().then(setAddress);
    }, [signer]);

    const toggleDetails = useCallback(() => {
        setDetails((prev) => !prev);
    }, []);

    return (
        <div className="flex flex-col gap-6 pb-12 px-6">
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
                    <BalanceChanges analysis={analysis} address={address} />
                    <AssetChanges analysis={analysis} />
                    <RawOutput analysis={analysis} />
                </div>
            )}
        </div>
    );
};

export default Details;
