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
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { AnalyzeChangesResult } from '../lib/analyzeChanges';
import type { SuiObjectChange } from '@mysten/sui.js/client';
import type { WalletSigner } from '_src/shared/cryptography/WalletSigner';

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
        <div className="h-full flex flex-col w-full gap-3">
            <Header>
                <Warning>
                    This transaction transfers
                    {name ? ` ${name} ` : ' an asset '}
                    to another owner.
                </Warning>
            </Header>
            <TransactionBody>
                <SendAssetImage imageUrl={imageUrl} name={name} />
                <div className="flex flex-col items-center gap-1 text-lg py-3">
                    <BodyLarge className="font-light">
                        Confirm you want to send
                    </BodyLarge>
                    {name && <BodyLarge isSemibold>{name}</BodyLarge>}
                    <Body className="text-ethos-light-text-medium text-sm">
                        {truncateMiddle(objectId)}
                    </Body>
                </div>
            </TransactionBody>
            <FromToCard to={to} />
            <NextStep onNextStep={onNextStep} onCancel={onCancel} />
            <Steps activeStep={0} stepCount={2} onClick={onSelectStep} />
        </div>
    );
};

const StepTwo = ({
    signer,
    stepInformation,
    onApprove,
    onCancel,
    onSelectStep,
}: {
    signer: WalletSigner;
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
        <div className="h-full flex flex-col w-full gap-3">
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
    signer: WalletSigner;
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
