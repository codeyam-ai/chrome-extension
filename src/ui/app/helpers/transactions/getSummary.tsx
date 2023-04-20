import BasicSummary from '../../shared/transactions/BasicSummary';
import FaucetSummary from '../../shared/transactions/FaucetSummary';
import MoveCallsSummary from '../../shared/transactions/MoveCallsSummary';
import SendingSummary from '../../shared/transactions/SendingSummary';
import StakingSummary from '../../shared/transactions/StakingSummary';

import type { AnalyzedTransaction } from './analyzeTransactions';
import type { ReactNode } from 'react';

const getSummary = (
    analyzedTransaction: AnalyzedTransaction,
    timeDisplay: string
): ReactNode => {
    if (analyzedTransaction.important.faucet) {
        return <FaucetSummary />;
    }

    if (analyzedTransaction.important.staking) {
        return (
            <StakingSummary
                stakingTransactionInfo={
                    analyzedTransaction.important.staking[0]
                }
                timeDisplay={timeDisplay}
                isFailure={analyzedTransaction.status === 'failure'}
            />
        );
    }

    if (analyzedTransaction.important.moveCalls) {
        return (
            <MoveCallsSummary
                moveCallTransactionInfo={
                    analyzedTransaction.important.moveCalls[0]
                }
                timeDisplay={timeDisplay}
            />
        );
    }

    if (analyzedTransaction.important.sending) {
        return (
            <SendingSummary
                sendingTransactionInfo={
                    analyzedTransaction.important.sending[0]
                }
                timeDisplay={timeDisplay}
            />
        );
    }

    if (analyzedTransaction.important.basic) {
        return (
            <BasicSummary
                basicTransactionInfo={analyzedTransaction.important.basic}
                timeDisplay={timeDisplay}
            />
        );
    }

    if (analyzedTransaction.status === 'failure') {
        return <>Transaction Failed</>;
    }

    return <></>;
};

export default getSummary;
