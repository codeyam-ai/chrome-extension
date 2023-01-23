import { useMemo } from 'react';

import { Dot } from '../CostValue';
import Body from '_src/ui/app/shared/typography/Body';

import type { SummaryGeneratorArgs } from './standard';

const CapyVote = ({
    txInfo,
    formattedGas,
    gasSymbol,
    gasDollars,
    formattedTotal,
    totalSymbol,
    totalDollars,
}: SummaryGeneratorArgs) => {
    const { uuid, name } = useMemo(() => {
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
    }, [txInfo]);

    return (
        <div className="bg-[#F3F9FF] dark:bg-[#1A1C26] p-6 flex flex-col gap-6 rounded-2xl text-black dark:text-white">
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

            <div className="flex flex-col gap-3 text-sm">
                <Body isSemibold className="text-lg">
                    Cost
                </Body>
                <div className="flex justify-between items-center border-b pb-3 border-black">
                    <div>Gas Fee</div>
                    <div className="flex justify-end gap-3 items-center">
                        <div>
                            {formattedGas} {gasSymbol}
                        </div>
                        <Dot />
                        <div>{gasDollars}</div>
                    </div>
                </div>
                <div className="flex justify-between items-center font-semibold">
                    <div>Total</div>
                    <div className="flex justify-end gap-3 items-center">
                        <div>
                            {formattedTotal} {totalSymbol}
                        </div>
                        <Dot />
                        <div>{totalDollars}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CapyVote;
