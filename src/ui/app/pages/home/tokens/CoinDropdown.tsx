import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Fragment, useMemo } from 'react';

import { useFormatCoin } from '../../../hooks/useFormatCoin';
import SuiIcon from '../../../shared/svg/SuiIcon';
import BodyLarge from '../../../shared/typography/BodyLarge';
import CoinBalance from './CoinBalance';
import UnknownToken from './UnknownToken';
import { useAppSelector } from '_src/ui/app/hooks';
import { accountAggregateBalancesSelector } from '_src/ui/app/redux/slices/account';

export const CoinSelect = ({
    selectedCoinType,
}: {
    selectedCoinType?: string | null;
}) => {
    const balances = useAppSelector(accountAggregateBalancesSelector);
    const multiCoins = Object.keys(balances).length > 1;
    const [, symbol, , name, icon] = useFormatCoin(
        balances[selectedCoinType || 'SUI'],
        selectedCoinType
    );

    const coinOptions: Record<string, bigint> = useMemo(() => {
        return Object.entries(balances)
            .filter(([coinType]) => coinType !== selectedCoinType)
            .reduce((acc: Record<string, bigint>, [coinType, balance]) => {
                acc[coinType] = balance;
                return acc;
            }, {});
    }, [balances, selectedCoinType]);

    const iconImage = useMemo(() => {
        if (name === 'Sui' || name === 'SUI') {
            return <SuiIcon width={16} height={16} />;
        } else if (icon) {
            return <img src={icon} alt={name} />;
        } else {
            return <UnknownToken width={24} height={24} />;
        }
    }, [name, icon]);

    if (!Object.keys(balances).length || !selectedCoinType || !name)
        return <></>;

    return (
        <>
            <div className="w-full max-w-sm px-4">
                <Popover>
                    {({ close }) => (
                        <>
                            <Popover.Button className="pr-3 flex relative flex-row gap-2 p-2 rounded-full items-center bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary">
                                <div
                                    className={
                                        'rounded-full w-6 h-6 flex justify-center items-center bg-[#3D5FF2]'
                                    }
                                >
                                    {iconImage}
                                </div>
                                <BodyLarge>{symbol}</BodyLarge>
                                {multiCoins && <ChevronDownIcon width={14} />}
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-[312px] -translate-x-1/2 transform">
                                    <div className="relative flex flex-col p-2 rounded-lg overflow-y-scroll max-h-[438px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default border-[.5px] border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke shadow-ethos-hovering-element-box-shadow ring-1 ring-black ring-opacity-5">
                                        {Object.entries(coinOptions).map(
                                            ([coinType, balance], idx) => {
                                                if (
                                                    coinType !==
                                                    selectedCoinType
                                                ) {
                                                    return (
                                                        <div
                                                            onClick={close}
                                                            key={idx}
                                                            className={
                                                                'p-2 hover:bg-ethos-light-background-secondary dark:hover:bg-ethos-dark-background-secondary rounded-lg'
                                                            }
                                                        >
                                                            <CoinBalance
                                                                type={coinType}
                                                                balance={
                                                                    balance
                                                                }
                                                            />
                                                        </div>
                                                    );
                                                } else {
                                                    return <></>;
                                                }
                                            }
                                        )}
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
        </>
    );
};
