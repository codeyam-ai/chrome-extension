import { BCS, getSuiMoveConfig } from '@mysten/bcs';
import { useMemo } from 'react';

import { Dot } from '../CostValue';
import Body from '_src/ui/app/shared/typography/Body';

import type { SummaryGeneratorArgs } from './standard';

const CapyNominate = ({
    address,
    txInfo,
    formattedGas,
    gasSymbol,
    gasDollars,
    formattedCharges,
    chargesSymbol,
    chargeDollars,
    formattedTotal,
    totalSymbol,
    totalDollars,
}: SummaryGeneratorArgs) => {
    const { name, url } = useMemo(() => {
        if (
            typeof txInfo === 'object' &&
            'data' in txInfo &&
            'packageObjectId' in txInfo.data &&
            typeof txInfo.data.arguments[2] === 'string'
        ) {
            const bcs = new BCS(getSuiMoveConfig());

            bcs.registerAddressType('SuiAddress', 20, 'hex');

            bcs.registerStructType('AiCapyData', {
                capyKey: 'string',
                prompt: 'string',
                style: 'string',
                name: 'string',
                description: 'string',
                url: 'string',
                image_hash: 'string',
                address: 'SuiAddress',
            });

            return bcs.de('AiCapyData', txInfo.data.arguments[2], 'hex');
        }

        return { name: undefined, url: undefined };
    }, [txInfo]);

    return (
        <div className="bg-[#F3F9FF] p-6 flex flex-col gap-6 rounded-2xl text-black">
            <div>
                <div className="text-2xl font-semibold">Nominate</div>
                <div className="text-lg">{name}</div>
            </div>
            <div className="w-full aspect-square">
                {url && url.length > 0 && (
                    <img
                        src={url}
                        alt="Capy"
                        className="w-full aspect-square rounded-xl"
                    />
                )}
            </div>

            <Body isSemibold>Cost</Body>
            <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between items-center">
                    <div>Entry Fee</div>
                    <div className="flex justify-end gap-3 items-center">
                        <div>
                            {formattedCharges} {chargesSymbol}
                        </div>
                        <Dot />
                        <div>{chargeDollars}</div>
                    </div>
                </div>
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

export default CapyNominate;
