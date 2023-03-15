import { get } from 'lodash';
import { useEffect, useState } from 'react';

import { Dot } from '../CostValue';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Body from '_src/ui/app/shared/typography/Body';

import type { SummaryGeneratorArgs } from './standard';

const RedeemTicket = ({
    transaction,
    formattedGas,
    gasSymbol,
    gasDollars,
    formattedTotal,
    totalSymbol,
    totalDollars,
}: SummaryGeneratorArgs) => {
    return <></>;
    // const [count, setCount] = useState<number | undefined>();
    // const [coverImage, setCoverImage] = useState<string | undefined>();

    // useEffect(() => {
    //     const getTicket = async () => {
    //         if (
    //             typeof txInfo === 'object' &&
    //             'data' in txInfo &&
    //             'packageObjectId' in txInfo.data &&
    //             typeof txInfo.data.arguments[1] === 'string'
    //         ) {
    //             const ticket = await api.instance.fullNode.getObject({
    //                 id: txInfo.data.arguments[1],
    //                 options: {
    //                     showContent: true,
    //                     showOwner: true,
    //                     showType: true,
    //                 },
    //             });
    //
    //             const fields = get(ticket, 'details.data.fields');
    //             if (!fields) return;
    //
    //             const { count, url: coverImage } = fields;
    //
    //             setCount(parseInt(count));
    //             setCoverImage(coverImage);
    //         }
    //     };
    //
    //     getTicket();
    // }, [txInfo]);

    // return (
    //     <div className="bg-[#F3F9FF] dark:bg-[#1A1C26] p-6 flex flex-col gap-6 rounded-2xl text-black dark:text-white">
    //         <div className="flex flex-col gap-3">
    //             <div className="text-2xl font-semibold">Use your ticket?</div>
    //             <div className="text-base">
    //                 You will have {count ? count - 1 : ''} remaining uses.
    //             </div>
    //         </div>
    //         <div className="w-full aspect-[5/3] flex justify-center items-center">
    //             {coverImage && coverImage.length > 0 && (
    //                 <img
    //                     src={coverImage}
    //                     alt="Ticket"
    //                     className="w-full -rotate-12"
    //                 />
    //             )}
    //         </div>

    //         <div className="flex flex-col gap-3 text-sm">
    //             <Body isSemibold className="text-lg">
    //                 Cost
    //             </Body>
    //             <div className="flex justify-between items-center border-b pb-3 border-black">
    //                 <div>Gas Fee</div>
    //                 <div className="flex justify-end gap-3 items-center">
    //                     <div>
    //                         {formattedGas} {gasSymbol}
    //                     </div>
    //                     <Dot />
    //                     <div>{gasDollars}</div>
    //                 </div>
    //             </div>
    //             <div className="flex justify-between items-center font-semibold">
    //                 <div>Total</div>
    //                 <div className="flex justify-end gap-3 items-center">
    //                     <div>
    //                         {formattedTotal} {totalSymbol}
    //                     </div>
    //                     <Dot />
    //                     <div>{totalDollars}</div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default RedeemTicket;
