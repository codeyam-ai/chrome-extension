import { useMemo } from 'react';

import Approve from './Approve';
import Details from './Details';
import GenericTransactionCard from './GenericTranasctionCard';

import type { AnalyzeChangesResult } from '../lib/analyzeChanges';
import type { RawSigner } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';
import type { LedgerSigner } from '_src/shared/cryptography/LedgerSigner';

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
    signer: EthosSigner | LedgerSigner | RawSigner;
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
