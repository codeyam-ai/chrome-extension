import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useCallback, useMemo, useState } from 'react';

import { useFormatCoin } from '../../../hooks/useFormatCoin';
import SuiIcon from '../../../shared/svg/SuiIcon';
import BodyLarge from '../../../shared/typography/BodyLarge';
import CoinPickerList from './CoinPickerList';
import UnknownToken from './UnknownToken';
import { useAppSelector } from '_src/ui/app/hooks';
import { accountAggregateBalancesSelector } from '_src/ui/app/redux/slices/account';

export const CoinSelect = ({ type }: { type?: string | null }) => {
    const [open, setOpen] = useState(false);
    const balances = useAppSelector(accountAggregateBalancesSelector);
    const multiCoins = Object.keys(balances).length > 1;
    const [, symbol, , name, icon] = useFormatCoin(
        balances[type || 'SUI'],
        type
    );

    const iconImage = useMemo(() => {
        if (name) {
            switch (name) {
                case 'Sui':
                    return <SuiIcon width={16} height={16} />;
                case 'SUI':
                    return <SuiIcon width={16} height={16} />;
                default:
                    return <UnknownToken width={24} height={24} />;
            }
        }
    }, [name, icon]);

    const openCoinPicker = useCallback(() => {
        if (multiCoins) {
            setOpen(true);
        }
    }, [multiCoins]);

    const closeCoinPicker = useCallback(() => {
        setOpen(false);
    }, []);

    if (!Object.keys(balances).length || !type || !name) return <></>;

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
                    {iconImage}
                </div>
                <BodyLarge>{symbol}</BodyLarge>
                {multiCoins && <ChevronDownIcon width={14} />}
            </div>
            <div
                onMouseLeave={closeCoinPicker}
                className={`p-3 absolute z-20 left-0 right-0 top-[55px] shadow-md rounded-lg bg-ethos-light-background-default dark:bg-ethos-dark-background-default w-full ${
                    open ? '' : 'hidden'
                }`}
            >
                <CoinPickerList balances={balances} coinType={type} />
            </div>
        </>
    );
};
