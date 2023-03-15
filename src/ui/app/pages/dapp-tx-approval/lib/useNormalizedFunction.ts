// import { useState } from 'react';

// import { thunkExtras } from '_src/ui/app/redux/store/thunk-extras';

// import type { SuiMoveNormalizedFunction } from '@mysten/sui.js';
import type { ApprovalRequest } from '_src/shared/messaging/messages/payloads/transactions';

const useNormalizedFunction = (txRequest: ApprovalRequest | null) => {
    // const [normalizedFunction, setNormalizedFunction] = useState<
    //     SuiMoveNormalizedFunction | undefined
    // >();
    // useEffect(() => {
    //     const getNormalizedFunction = async () => {
    //         if (!txRequest) return [];
    //         if (txRequest.tx.type === 'transaction') return [];
    //         if (typeof txRequest.tx.data === 'string') return [];
    //         if (!('packageObjectId' in txRequest.tx.data.data)) return [];
    //
    //         const {
    //             packageObjectId,
    //             module,
    //             function: func,
    //         } = txRequest.tx.data.data;
    //
    //         const normalizedFunction =
    //             await thunkExtras.api.instance.fullNode.getNormalizedMoveFunction(
    //                 {
    //                     package: packageObjectId,
    //                     module: module,
    //                     function: func,
    //                 }
    //             );
    //         setNormalizedFunction(normalizedFunction);
    //     };
    //
    //     getNormalizedFunction();
    // }, [txRequest]);
    //
    // return normalizedFunction;
};

export default useNormalizedFunction;
