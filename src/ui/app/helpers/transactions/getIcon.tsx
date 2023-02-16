import {
    ArrowDownLeftIcon,
    ArrowsRightLeftIcon,
    ArrowUpRightIcon,
    SparklesIcon,
} from '@heroicons/react/24/solid';

import type { TxAction } from './getTxAction';

const getIcon = (txType: TxAction) => {
    if (txType === 'send') {
        return <ArrowUpRightIcon />;
    } else if (txType === 'receive') {
        return <ArrowDownLeftIcon />;
    } else if (txType === 'mint') {
        return <SparklesIcon />;
    } else {
        return <ArrowsRightLeftIcon />;
    }
};

export default getIcon;
