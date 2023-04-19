import {
    ArrowDownLeftIcon,
    ArrowDownOnSquareIcon,
    ArrowsRightLeftIcon,
    ArrowsUpDownIcon,
    ArrowUpRightIcon,
    CheckIcon,
    CodeBracketIcon,
    FireIcon,
    SparklesIcon,
    Square3Stack3DIcon,
} from '@heroicons/react/24/solid';

import type { TxAction } from './getTxAction';

const getIcon = (txAction: TxAction, width?: number): JSX.Element => {
    switch (txAction) {
        case 'mint':
            return <SparklesIcon width={width} />;
        case 'transfer':
            return <ArrowsRightLeftIcon width={width} />;
        case 'function':
            return <CodeBracketIcon width={width} />;
        case 'faucet':
            return <ArrowDownOnSquareIcon width={width} />;
        case 'staking':
            return <Square3Stack3DIcon width={width} />;
        case 'send':
            return <ArrowUpRightIcon width={width} />;
        case 'receive':
            return <ArrowDownLeftIcon width={width} />;
        case 'clone':
            return <ArrowsUpDownIcon width={width} />;
        case 'burn':
            return <FireIcon width={width} />;
        default:
            return <CheckIcon width={width} />;
    }
};

export default getIcon;
