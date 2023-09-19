import { useMemo } from 'react';

import Approve from './Approve';
import Details from './Details';
import GenericTransactionCard from './GenericTranasctionCard';

import type { AnalyzeChangesResult } from '../lib/analyzeChanges';
import type { WalletSigner } from '_src/shared/cryptography/WalletSigner';


export type StepInformation = {
    analysis: AnalyzeChangesResult;
};

const ComplexMoveCall = ({
    analysis,
    onApprove,
    onCancel,
    signer,
}: {
    analysis: AnalyzeChangesResult;
    onApprove: () => void;
    onCancel: () => void;
    signer: WalletSigner;
}) => {
    const stepInformation = useMemo(() => ({ analysis }), [analysis]);

    return (
        <div className="h-full flex flex-col w-full gap-3">
            <GenericTransactionCard stepInformation={stepInformation} />
            <Details analysis={analysis} signer={signer} />
            <Approve onApprove={onApprove} onCancel={onCancel} />
        </div>
    );
};

export default ComplexMoveCall;
