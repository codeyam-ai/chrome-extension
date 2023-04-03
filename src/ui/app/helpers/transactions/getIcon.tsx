import {
    ArrowDownLeftIcon,
    ArrowsRightLeftIcon,
    ArrowsUpDownIcon,
    ArrowUpRightIcon,
    CheckIcon,
    CodeBracketIcon,
    FireIcon,
    SparklesIcon,
} from '@heroicons/react/24/solid';

const getIcon = (txAction: string): JSX.Element => {
    switch (txAction) {
        case 'mint':
            return <SparklesIcon />;
        case 'transfer':
            return <ArrowsRightLeftIcon />;
        case 'function':
            return <CodeBracketIcon />;
        case 'send':
            return <ArrowUpRightIcon />;
        case 'receive':
            return <ArrowDownLeftIcon />;
        case 'clone':
            return <ArrowsUpDownIcon />;
        case 'burn':
            return <FireIcon />;
        default:
            return <CheckIcon />;
    }
};

export default getIcon;
