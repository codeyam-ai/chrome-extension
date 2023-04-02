import { useCallback, useEffect, useMemo, useState } from 'react';

import Approve from './Approve';
import Details from './Details';
import FromToCard from './FromToCard';
import Header from './Header';
import NextStep from './NextStep';
import Steps from './Steps';
import TransactionBody from './TransactionBody';
// import TransactionCard from './TransactionCard';
// import TransactionImage from './TransactionImage';
import Warning from './Warning';
import basicNftData, { type BasicNFtData } from '../lib/basicNftData';
import owner from '../lib/owner';
import Loading from '_src/ui/app/components/loading';

import type { AnalyzeChangesResult } from '../lib/analyzeChanges';
import type { RawSigner, SuiObjectChange } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';

export type StepInformation = {
    name: string;
    imageUrl: string;
    to: string;
    analysis: AnalyzeChangesResult;
};

const StepOne = ({
    stepInformation,
    onNextStep,
    onCancel,
    onSelectStep,
}: {
    stepInformation: StepInformation;
    onNextStep: () => void;
    onCancel: () => void;
    onSelectStep: (index: number) => void;
}) => {
    const { name, to } = stepInformation;
    return (
        <>
            <Header>
                <Warning>
                    This transaction will transfer an asset out or your wallet.
                </Warning>
            </Header>
            <TransactionBody>NFT TRANSFER {name}</TransactionBody>
            <FromToCard to={to} />
            <NextStep onNextStep={onNextStep} onCancel={onCancel} />
            <Steps activeStep={0} stepCount={2} onClick={onSelectStep} />
        </>
    );
};

const StepTwo = ({
    stepInformation,
    onApprove,
    onCancel,
    onSelectStep,
}: {
    stepInformation: StepInformation;
    onApprove: () => void;
    onCancel: () => void;
    onSelectStep: (index: number) => void;
}) => {
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setDisabled(false), 500);
    }, []);

    return (
        <div className="h-full flex flex-col w-full py-3">
            {/* <TransactionCard stepInformation={stepInformation} /> */}
            <Details analysis={stepInformation.analysis} />
            <Approve
                disabled={disabled}
                onApprove={onApprove}
                onCancel={onCancel}
            />
            <Steps activeStep={1} stepCount={2} onClick={onSelectStep} />
        </div>
    );
};

const SimpleAssetTransfer = ({
    signer,
    assetTransfer,
    analysis,
    onApprove,
    onCancel,
}: {
    signer: RawSigner | EthosSigner;
    assetTransfer: SuiObjectChange;
    analysis: AnalyzeChangesResult;
    onApprove: () => void;
    onCancel: () => void;
}) => {
    let to = 'Unknown';
    if ('owner' in assetTransfer) {
        to = owner(assetTransfer.owner);
    }

    const [step, setStep] = useState<number>(0);
    const [nft, setNFT] = useState<BasicNFtData | undefined>();

    const loading = useMemo(() => !!nft, [nft]);

    useEffect(() => {
        const getNFT = async () => {
            if (!signer || !('objectId' in assetTransfer)) return;
            const nft = await basicNftData({
                signer,
                objectId: assetTransfer.objectId,
            });
            setNFT(nft);
        };

        getNFT();
    }, [signer, assetTransfer]);

    const onNextStep = useCallback(() => {
        setStep((step) => step + 1);
    }, []);

    const stepInformation = useMemo(
        () => ({
            ...(nft || { name: '', imageUrl: '' }),
            to,
            analysis,
        }),
        [nft, to, analysis]
    );

    const stepNode = useMemo(() => {
        if (step === 0) {
            return (
                <StepOne
                    stepInformation={stepInformation}
                    onNextStep={onNextStep}
                    onCancel={onCancel}
                    onSelectStep={setStep}
                />
            );
        } else {
            return (
                <StepTwo
                    stepInformation={stepInformation}
                    onApprove={onApprove}
                    onCancel={onCancel}
                    onSelectStep={setStep}
                />
            );
        }
    }, [step, stepInformation, onNextStep, onCancel, onApprove]);

    return (
        <Loading loading={loading} big={true} resize={true}>
            {stepNode}
        </Loading>
    );
};

export default SimpleAssetTransfer;
