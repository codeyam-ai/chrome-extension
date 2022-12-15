import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useCallback, useMemo, useState } from 'react';

import truncateString from '../../../helpers/truncate-string';
import SuiIcon from '../../../shared/svg/SuiIcon';
import BodyLarge from '../../../shared/typography/BodyLarge';
import CoinPickerList from './CoinPickerList';
import UnknownToken from './UnknownToken';
import { useAppSelector } from '_src/ui/app/hooks';
import { accountAggregateBalancesSelector } from '_src/ui/app/redux/slices/account';

export const CoinSelect = ({ type }: { type?: string | null }) => {
    const [open, setOpen] = useState(false);
    const balances = useAppSelector(accountAggregateBalancesSelector);

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

    const openCoinPicker = useCallback(() => {
        setOpen(true);
    }, []);

    const closeCoinPicker = useCallback(() => {
        setOpen(false);
    }, []);

    if (!type || !name) return <></>;

    return (
        <>
            <div
                onMouseEnter={openCoinPicker}
                className={
                    'pr-3 flex relative flex-row gap-2 p-2 rounded-full items-center bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary'
                }
            >
                <div
                    className={
                        'rounded-full w-6 h-6 flex justify-center items-center bg-[#3D5FF2]'
                    }
                >
                    {icon}
                </div>
                <BodyLarge>{truncateString(name, 14)}</BodyLarge>
                <ChevronDownIcon width={14} />
            </div>
            <div
                onMouseLeave={closeCoinPicker}
                className={`p-3 absolute z-20 left-0 right-0 top-[55px] shadow-md rounded-lg bg-ethos-light-background-default dark:bg-ethos-dark-background-default w-full ${
                    open ? '' : 'hidden'
                }`}
            >
                <CoinPickerList balances={balances} />
            </div>
        </>
    );
};
