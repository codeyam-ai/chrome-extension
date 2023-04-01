import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';

import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { AnalyzeChangesResult } from '../lib/analyzeChanges';
import type { ReactNode } from 'react';

const Row = ({ title, value }: { title: string; value: string }) => {
    return (
        <div className="flex flex-row items-center justify-between">
            <Body>{title}</Body>
            <Body isSemibold>{value}</Body>
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

    return (
        <Section title="Balance Changes">
            {analysis.dryRunResponse.balanceChanges.map(
                (balanceChange, index) => {
                    return (
                        <Row
                            key={`row-${index}`}
                            title={balanceChange.coinType}
                            value={balanceChange.amount}
                        />
                    );
                }
            )}
        </Section>
    );
};

const AssetChanges = ({ analysis }: { analysis: AnalyzeChangesResult }) => {
    if (analysis.dryRunResponse.objectChanges.length === 0) return null;

    return (
        <Section title="Asset (NFT) Changes">
            {analysis.dryRunResponse.objectChanges.map(
                (objectChange, index) => {
                    return (
                        <Row
                            key={`row-${index}`}
                            title={objectChange.type}
                            value={objectChange.type}
                        />
                    );
                }
            )}
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
                <ChevronDownIcon color="#9040F5" width={20} />
            </div>
            {details && (
                <div className="flex flex-col gap-6 divider-y divider-color-[#F0EBFE]">
                    <BalanceChanges analysis={analysis} />
                    <AssetChanges analysis={analysis} />
                    <Section title="Move Calls">
                        <Row title="CCC" value="DDD" />
                        <Row title="CCC" value="DDD" />
                        <Row title="CCC" value="DDD" />
                    </Section>
                </div>
            )}
        </div>
    );
};

export default Details;
