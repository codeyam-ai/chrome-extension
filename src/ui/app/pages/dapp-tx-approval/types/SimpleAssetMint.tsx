import { useMemo } from 'react';

import Approve from './Approve';
import Details from './Details';
import MintTransactionCard from './MintTransactionCard';

import type { AnalyzeChangesResult } from '../lib/analyzeChanges';
import type { RawSigner } from '@mysten/sui.js';
import type { SuiObjectChange } from '@mysten/sui.js/client';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';
import type { LedgerSigner } from '_src/shared/cryptography/LedgerSigner';

export type StepInformation = {
    id: string;
    type?: string;
    analysis: AnalyzeChangesResult;
};

const SimpleAssetMint = ({
    assetMint,
    analysis,
    onApprove,
    onCancel,
    signer,
}: {
    assetMint: SuiObjectChange;
    analysis: AnalyzeChangesResult;
    onApprove: () => void;
    onCancel: () => void;
    signer: EthosSigner | LedgerSigner | RawSigner;
}) => {
    const stepInformation = useMemo(
        () => ({
            publish: assetMint.type === 'published',
            id:
                'objectId' in assetMint
                    ? assetMint.objectId
                    : assetMint.packageId,
            type:
                'objectType' in assetMint
                    ? assetMint.objectType
                    : assetMint.packageId,
            analysis,
        }),
        [assetMint, analysis]
    );

    return (
        <div className="h-full flex flex-col w-full gap-3">
            <MintTransactionCard stepInformation={stepInformation} />
            <Details analysis={analysis} signer={signer} />
            <Approve onApprove={onApprove} onCancel={onCancel} />
        </div>
    );
};

export default SimpleAssetMint;
