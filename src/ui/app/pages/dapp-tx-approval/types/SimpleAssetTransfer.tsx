import { useCallback, useEffect, useMemo, useState } from 'react';

import Approve from './Approve';
import AssetTransactionCard from './AssetTransactionCard';
import Details from './Details';
import FromToCard from './FromToCard';
import Header from './Header';
import NextStep from './NextStep';
import SendAssetImage from './SendAssetImage';
import Steps from './Steps';
import TransactionBody from './TransactionBody';
import Warning from './Warning';
import basicNftData, { type BasicNFtData } from '../lib/basicNftData';
import owner from '../lib/owner';
import resizeWindow from '../lib/resizeWindow';
import Loading from '_src/ui/app/components/loading';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';

import type { AnalyzeChangesResult } from '../lib/analyzeChanges';
import type { RawSigner, SuiObjectChange } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';

export type StepInformation = {
    objectId: string;
    name?: string;
    imageUrl?: string;
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
    const { objectId, name, imageUrl, to } = stepInformation;
    return (
        <>
            <Header>
                <Warning>
                    This transaction transfers
                    {name ? ` ${name} ` : ' an asset '}
                    to another owner.
                </Warning>
            </Header>
            <TransactionBody>
                <SendAssetImage imageUrl={imageUrl} name={name} />
                <div className="flex flex-col items-center gap-1 text-lg">
                    <div className="font-light">Confirm your want to send</div>
                    <div className="font-semibold">
                        {name ??
                            (imageUrl
                                ? 'This Asset'
                                : truncateMiddle(objectId))}
                    </div>
                </div>
            </TransactionBody>
            <FromToCard to={to} />
            <NextStep onNextStep={onNextStep} onCancel={onCancel} />
            <Steps activeStep={0} stepCount={2} onClick={onSelectStep} />
        </>
    );
};

const StepTwo = ({
    signer,
    stepInformation,
    onApprove,
    onCancel,
    onSelectStep,
}: {
    signer: RawSigner | EthosSigner;
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
            <AssetTransactionCard stepInformation={stepInformation} />
            <Details analysis={stepInformation.analysis} signer={signer} />
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

    let objectId = 'Unknown';
    if ('objectId' in assetTransfer) {
        objectId = assetTransfer.objectId;
    }

    const [step, setStep] = useState<number>(0);
    const [nft, setNFT] = useState<BasicNFtData | undefined>();

    const loading = useMemo(() => !nft, [nft]);

    useEffect(() => {
        const getNFT = async () => {
            if (!signer) return;
            const nft = await basicNftData({
                signer,
                objectId,
            });
            setNFT(nft);
        };

        getNFT();
    }, [signer, objectId]);

    useEffect(() => {
        resizeWindow();
    }, [step]);

    const onNextStep = useCallback(() => {
        setStep((step) => step + 1);
    }, []);

    const stepInformation = useMemo(
        () => ({
            objectId,
            ...nft,
            to,
            analysis,
        }),
        [objectId, nft, to, analysis]
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
                    signer={signer}
                    stepInformation={stepInformation}
                    onApprove={onApprove}
                    onCancel={onCancel}
                    onSelectStep={setStep}
                />
            );
        }
    }, [signer, step, stepInformation, onNextStep, onCancel, onApprove]);

    return (
        <Loading
            loading={loading}
            big={true}
            resize={true}
            className="py-12 text-center"
        >
            {stepNode}
        </Loading>
    );
};

export default SimpleAssetTransfer;
