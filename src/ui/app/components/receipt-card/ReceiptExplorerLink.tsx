import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

import BodyLarge from '../../shared/typography/BodyLarge';
import ExplorerLink from '../explorer-link';
import { ExplorerLinkType } from '../explorer-link/ExplorerLinkType';

import type { AnalyzedTransaction } from '../../helpers/transactions/analyzeTransactions';

import st from './ReceiptCard.module.scss';

const ReceiptExplorerLink = ({ digest }: AnalyzedTransaction) => {
    return (
        <div className={'flex flex-row justify-between'}>
            <BodyLarge>
                <ExplorerLink
                    type={ExplorerLinkType.transaction}
                    transactionID={digest}
                    title="View on Sui Explorer"
                    className={st['explorer-link']}
                    showIcon={true}
                >
                    View on Sui Explorer
                </ExplorerLink>
            </BodyLarge>
            <div className={'text-ethos-light-text-medium'}>
                <ExplorerLink
                    type={ExplorerLinkType.transaction}
                    transactionID={digest}
                    title="View on Sui Explorer"
                    className={st['explorer-link']}
                    showIcon={true}
                >
                    <ArrowUpRightIcon width={16} height={16} />
                </ExplorerLink>
            </div>
        </div>
    );
};

export default ReceiptExplorerLink;
