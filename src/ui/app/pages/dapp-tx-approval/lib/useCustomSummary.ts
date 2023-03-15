import { useMemo } from 'react';

// import { growthbook } from '_src/ui/app/experimentation/feature-gating';

import type { ApprovalRequest } from '_src/shared/messaging/messages/payloads/transactions';

const useCustomSummary = (txRequest: ApprovalRequest | null) => {
    const summaryKey = useMemo(() => {
        if (!txRequest) return;

        // const txInfo = txRequest?.tx;
        // const customSummaries = growthbook.getFeatureValue(
        //     'custom-summaries',
        //     {} as Record<string, string>
        // );

        const summaryKey = 'standard';

        // if (
        //     txInfo &&
        //     typeof txInfo !== 'string' &&
        //     'data' in txInfo &&
        //     'packageObjectId' in txInfo.data
        // ) {
        //     const functionType = `${txInfo.data.packageObjectId}::${txInfo.data.module}::${txInfo.data.function}`;
        //     if (customSummaries[functionType]) {
        //         summaryKey = customSummaries[functionType];
        //     }
        // }
        //
        return summaryKey;
    }, [txRequest]);

    return summaryKey;
};

export default useCustomSummary;
