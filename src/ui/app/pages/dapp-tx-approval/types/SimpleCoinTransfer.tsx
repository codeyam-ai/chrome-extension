import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Approve from './Approve';
import CoinTransactionCard from './CoinTransactionCard';
import Details from './Details';
import FromToCard from './FromToCard';
import Header from './Header';
import NextStep from './NextStep';
import SendCoinImage from './SendCoinImage';
import Steps from './Steps';
import TransactionBody from './TransactionBody';
import Warning from './Warning';
import resizeWindow from '../lib/resizeWindow';
import { useDependencies } from '_shared/utils/dependenciesContext';
import Loading from '_src/ui/app/components/loading';
import { useFormatCoin } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type {
    AnalyzeChangesResult,
    BalanceReduction,
} from '../lib/analyzeChanges';
import type { RawSigner } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';
import type { LedgerSigner } from '_src/shared/cryptography/LedgerSigner';

export type StepInformation = {
    name: string;
    formatted: string;
    formattedRemainder: string;
    iconUrl: string | null;
    symbol: string;
    dollars: string;
    to: string;
    analysis: AnalyzeChangesResult;
    hasConversion: boolean;
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
    const { featureFlags } = useDependencies();

    const {
        name,
        formatted,
        formattedRemainder,
        iconUrl,
        symbol,
        dollars,
        to,
        hasConversion,
    } = stepInformation;
    return (
        <div className="h-full flex flex-col w-full gap-3">
            <Header>
                <Warning>
                    This transaction will reduce your {name} balance by{' '}
                    {formatted}. Your remaining balance will be{' '}
                    {formattedRemainder} {symbol}.
                </Warning>
            </Header>
            <TransactionBody>
                <SendCoinImage iconUrl={iconUrl} symbol={symbol} />
                <div className="flex flex-col items-center gap-1 text-lg py-3">
                    <BodyLarge className="font-light">
                        Confirm you want to send
                    </BodyLarge>
                    {name && (
                        <BodyLarge isSemibold>
                            {formatted} {symbol.toUpperCase()}
                        </BodyLarge>
                    )}
                    {featureFlags?.showUsd && hasConversion && (
                        <Body className="text-ethos-light-text-medium text-sm">
                            ≈ {dollars} USD
                        </Body>
                    )}
                </div>
            </TransactionBody>
            <FromToCard to={to}></FromToCard>
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
    signer: RawSigner | EthosSigner | LedgerSigner;
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
            <CoinTransactionCard stepInformation={stepInformation} />
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

const SimpleCoinTransfer = ({
    signer,
    reduction,
    analysis,
    onApprove,
    onCancel,
}: {
    signer: RawSigner | EthosSigner | LedgerSigner;
    reduction: BalanceReduction;
    analysis: AnalyzeChangesResult;
    onApprove: () => void;
    onCancel: () => void;
}) => {
    const to = reduction.recipient || '';
    const [step, setStep] = useState<number>(0);
    const [balance, setBalance] = useState<string>('0');

    const loading = useMemo(() => balance === '0', [balance]);

    const absReduction = useMemo(
        () => new BigNumber(reduction.amount).abs(),
        [reduction]
    );
    const [formatted, symbol, dollars, name, iconUrl, , , hasConversion] =
        useFormatCoin(absReduction.toString(), reduction.type);

    const [formattedRemainder] = useFormatCoin(
        new BigNumber(balance).minus(absReduction).toString(),
        reduction.type
    );

    useEffect(() => {
        const getBalance = async () => {
            if (!signer) return;
            const owner = await signer.getAddress();
            const balance = await signer.client.getBalance({
                owner,
                coinType: reduction.type,
            });
            setBalance(balance.totalBalance.toString());
        };

        getBalance();
    }, [signer, reduction]);

    useEffect(() => {
        resizeWindow();
    }, [step]);

    const onNextStep = useCallback(() => {
        setStep((step) => step + 1);
    }, []);

    const stepInformation = useMemo(
        () => ({
            name,
            formatted,
            formattedRemainder,
            iconUrl,
            symbol,
            dollars,
            to,
            analysis,
            hasConversion,
        }),
        [
            dollars,
            formatted,
            formattedRemainder,
            iconUrl,
            name,
            symbol,
            to,
            analysis,
            hasConversion,
        ]
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

export default SimpleCoinTransfer;
