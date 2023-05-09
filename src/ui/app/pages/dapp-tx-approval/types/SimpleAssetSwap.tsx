import { useMemo } from 'react';

import Approve from './Approve';
import Details from './Details';
import SwapTransactionCard from './SwapTransactionCard';

import type {
    AnalyzeChangesResult,
    BalanceAddition,
    BalanceReduction,
} from '../lib/analyzeChanges';
import type { RawSigner } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';

export type StepInformation = {
    addition: BalanceAddition;
    reduction: BalanceAddition;
    analysis: AnalyzeChangesResult;
};

const SimpleAssetSwap = ({
    addition,
    reduction,
    analysis,
    onApprove,
    onCancel,
    signer,
}: {
    addition: BalanceAddition;
    reduction: BalanceReduction;
    analysis: AnalyzeChangesResult;
    onApprove: () => void;
    onCancel: () => void;
    signer: EthosSigner | RawSigner;
}) => {
    const stepInformation = useMemo(
        () => ({ addition, reduction, analysis }),
        [addition, reduction, analysis]
    );

    return (
        <div className="h-full flex flex-col w-full gap-3">
            <SwapTransactionCard stepInformation={stepInformation} />
            <Details analysis={analysis} signer={signer} />
            <Approve onApprove={onApprove} onCancel={onCancel} />
        </div>
    );
};

export default SimpleAssetSwap;
