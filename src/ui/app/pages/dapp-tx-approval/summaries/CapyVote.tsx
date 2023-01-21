import { useMemo } from 'react';

import Body from '_src/ui/app/shared/typography/Body';

import type { SummaryGeneratorArgs } from './standard';

const CapyVote = ({
    address,
    txInfo,
    formattedGas,
    gasSymbol,
    gasDollars,
    formattedTotal,
    totalSymbol,
    totalDollars,
}: SummaryGeneratorArgs) => {
    const { uuid, name } = useMemo(() => {
        if (!address) return { uuid: '', name: '' };

        if (
            typeof txInfo === 'object' &&
            'data' in txInfo &&
            'packageObjectId' in txInfo.data &&
            typeof txInfo.data.arguments[0] === 'string'
        ) {
            const [uuid, name] = txInfo.data.arguments[0]
                .replace(/\+/g, ' ')
                .split('--');
            return { uuid, name };
        }

        return { uuid: '', name: '' };
    }, [txInfo, address]);

    return (
        <div className="bg-[#F3F9FF] p-6 flex flex-col gap-6 rounded-2xl text-black">
            <div>
                <div className="text-2xl font-semibold">Vote for</div>
                <div className="text-lg">{name}</div>
            </div>
            <div className="w-full aspect-square">
                {uuid && uuid.length > 0 && (
                    <img
                        src={`https://ai-capy.s3.amazonaws.com/${uuid}`}
                        alt="Capy"
                        className="w-full aspect-square rounded-xl"
                    />
                )}
            </div>

            <Body isSemibold>Cost</Body>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center border-b pb-3 text-sm border-black">
                    <div>Gas Fee</div>
                    <div>{formattedGas} SUI</div>
                </div>
                <div className="flex justify-between items-center">
                    <Body isSemibold>Total</Body>
                    <Body isSemibold>{formattedGas} SUI</Body>
                </div>
            </div>
        </div>
    );
};

export default CapyVote;
