import { useMemo } from 'react';

import Approve from './Approve';
import Details from './Details';
import GenericTransactionCard from './GenericTranasctionCard';

import type { AnalyzeChangesResult } from '../lib/analyzeChanges';
import type { RawSigner } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';
import Warning from './Warning';
import Header from './Header';

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
    signer: EthosSigner | RawSigner;
}) => {
    const stepInformation = useMemo(() => ({ analysis }), [analysis]);

    return (
        <div className="h-full flex flex-col w-full py-3">
            <Header>
                <Warning>
                    This is a complex transaction. Please view the details below
                    to ensure everything is expected.
                </Warning>
            </Header>
            <GenericTransactionCard stepInformation={stepInformation} />
            <Details analysis={analysis} signer={signer} />
            <Approve onApprove={onApprove} onCancel={onCancel} />
        </div>
    );
};

export default ComplexMoveCall;
