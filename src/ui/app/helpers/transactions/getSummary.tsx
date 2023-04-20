import BasicSummary from '../../shared/transactions/BasicSummary';
import FaucetSummary from '../../shared/transactions/FaucetSummary';
import MoveCallsSummary from '../../shared/transactions/MoveCallsSummary';
import SendingSummary from '../../shared/transactions/SendingSummary';
import StakingSummary from '../../shared/transactions/StakingSummary';

import type { AnalyzedTransaction } from './analyzeTransactions';
import type { ReactNode } from 'react';

const getSummary = (analyzedTransaction: AnalyzedTransaction): ReactNode => {
    if (analyzedTransaction.important.faucet) {
        return <FaucetSummary />;
    }

    if (analyzedTransaction.important.staking) {
        return (
            <StakingSummary
                stakingTransactionInfo={
                    analyzedTransaction.important.staking[0]
                }
            />
        );
    }

    if (analyzedTransaction.important.moveCalls) {
        return (
            <MoveCallsSummary
                moveCallTransactionInfo={
                    analyzedTransaction.important.moveCalls[0]
                }
            />
        );
    }

    if (analyzedTransaction.important.sending) {
        return (
            <SendingSummary
                sendingTransactionInfo={
                    analyzedTransaction.important.sending[0]
                }
            />
        );
    }

    if (analyzedTransaction.important.basic) {
        return (
            <BasicSummary
                basicTransactionInfo={analyzedTransaction.important.basic}
            />
        );
    }

    if (analyzedTransaction.status === 'failure') {
        return <>Transaction Failed</>;
    }

    return <></>;
};

export default getSummary;
