import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Approve from './Approve';
import FromToCard from './FromToCard';
import Header from './Header';
import NextStep from './NextStep';
import Steps from './Steps';
import TransactionBody from './TransactionBody';
import TransactionCard from './TransactionCard';
import TransactionImage from './TransactionImage';
import Warning from './Warning';
import Loading from '_src/ui/app/components/loading';
import { useFormatCoin } from '_src/ui/app/hooks';

import type {
    AnalyzeChangesResult,
    BalanceReduction,
} from '../lib/analyzeChanges';
import type { RawSigner } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';

export type StepInformation = {
    name: string;
    formatted: string;
    formattedRemainder: string;
    iconUrl: string | null;
    symbol: string;
    dollars: string;
    to: string;
    analysis: AnalyzeChangesResult;
};

const StepOne = ({
    stepInformation,
    onNextStep,
    onCancel,
}: {
    stepInformation: StepInformation;
    onNextStep: () => void;
    onCancel: () => void;
}) => {
    const {
        name,
        formatted,
        formattedRemainder,
        iconUrl,
        symbol,
        dollars,
        to,
    } = stepInformation;
    return (
        <>
            <Header>
                <Warning>
                    This transaction will reduce your {name} balance by{' '}
                    {formatted}. Your remaining balance will be{' '}
                    {formattedRemainder} {symbol}.
                </Warning>
            </Header>
            <TransactionBody>
                <TransactionImage iconUrl={iconUrl} symbol={symbol} />
                <div className="flex flex-col items-center gap-1 text-lg">
                    <div className="font-light">Confirm your want to send</div>
                    <div className="font-semibold">
                        {formatted} {symbol.toUpperCase()}
                    </div>
                    <div className="text-[#74777C] text-base">≈ {dollars}</div>
                </div>
            </TransactionBody>
            <FromToCard to={to}></FromToCard>
            <NextStep onNextStep={onNextStep} onCancel={onCancel} />
            <Steps activeStep={0} stepCount={2} />
        </>
    );
};

const StepTwo = ({
    stepInformation,
    onApprove,
    onCancel,
}: {
    stepInformation: StepInformation;
    onApprove: () => void;
    onCancel: () => void;
}) => {
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setDisabled(false), 500);
    }, []);

    return (
        <div className="h-full flex flex-col w-full py-3">
            <TransactionCard stepInformation={stepInformation} />
            <Approve
                disabled={disabled}
                onApprove={onApprove}
                onCancel={onCancel}
            />
            <Steps activeStep={1} stepCount={2} />
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
    signer: RawSigner | EthosSigner;
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
    const [formatted, symbol, dollars, name, iconUrl] = useFormatCoin(
        absReduction.toString(),
        reduction.type
    );

    const [formattedRemainder] = useFormatCoin(
        new BigNumber(balance).plus(absReduction).toString(),
        reduction.type
    );

    useEffect(() => {
        const getBalance = async () => {
            if (!signer) return;
            const owner = await signer.getAddress();
            const balance = await signer.provider.getBalance({
                owner,
                coinType: reduction.type,
            });
            setBalance(balance.totalBalance.toString());
        };

        getBalance();
    }, [signer, reduction]);

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
        ]
    );

    const stepNode = useMemo(() => {
        if (step === 0) {
            return (
                <StepOne
                    stepInformation={stepInformation}
                    onNextStep={onNextStep}
                    onCancel={onCancel}
                />
            );
        } else {
            return (
                <StepTwo
                    stepInformation={stepInformation}
                    onApprove={onApprove}
                    onCancel={onCancel}
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

export default SimpleCoinTransfer;
