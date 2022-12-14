import { useMemo } from 'react';

import UnknownToken from '../../pages/home/tokens/UnknownToken';
import SuiIcon from '../svg/SuiIcon';
import BodyLarge from '../typography/BodyLarge';

export const CoinSelect = ({ type }: { type?: string | null }) => {
    const name = useMemo(() => {
        if (!type) return null;
        return type.split('::')[2];
    }, [type]);

    const icon = useMemo(() => {
        if (!name) return null;
        const dim = 16;
        switch (name) {
            case 'SUI':
                return <SuiIcon width={dim} height={dim} />;
            default:
                return <UnknownToken width={dim} height={dim} />;
        }
    }, [name]);

    if (!type) return <></>;

    return (
        <div
            className={
                'pr-6 flex flex-row gap-2 p-2 rounded-full items-center bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary'
            }
        >
            <div
                className={
                    'rounded-full w-6 h-6 flex justify-center items-center bg-[#3D5FF2]'
                }
            >
                {icon}
            </div>
            <BodyLarge>{name}</BodyLarge>
        </div>
    );
};
