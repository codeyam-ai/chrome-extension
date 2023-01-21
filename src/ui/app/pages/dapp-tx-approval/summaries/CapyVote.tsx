import { useEffect } from 'react';

import { api } from '_src/ui/app/redux/store/thunk-extras';
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
    useEffect(() => {
        if (!address) return;

        const getCapy = async () => {
            if (
                typeof txInfo === 'object' &&
                'data' in txInfo &&
                'packageObjectId' in txInfo.data
            ) {
                const response = await api.instance.fullNode.devInspectMoveCall(
                    address,
                    {
                        packageObjectId: txInfo.data.packageObjectId,
                        module: 'capy_election',
                        function: 'get_candidate',
                        typeArguments: [],
                        arguments: txInfo.data.arguments,
                    }
                );

                console.log('response', response);
            }
        };

        getCapy();
    }, [txInfo, address]);

    return (
        <div className="bg-[#F3F9FF] p-6 py-6 flex-col gap-6 rounded-2xl text-black">
            <div className="text-2xl">Vote for</div>

            <div className="flex flex-col gap-3">
                <Body isSemibold>Cost</Body>
                <div className="flex justify-between items-center border-b">
                    <div>Gas Fee</div>
                    <div>{formattedGas}</div>
                </div>
            </div>
        </div>
    );
};

export default CapyVote;
