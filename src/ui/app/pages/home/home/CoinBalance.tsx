import { type SyntheticEvent, memo, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Sui from './Sui';
import UnknownToken from './UnknownToken';
import { useDependencies } from '_src/shared/utils/dependenciesContext';
import truncateString from '_src/ui/app/helpers/truncate-string';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { useFormatCoin } from '_src/ui/app/hooks/useFormatCoin';
import {
    addInvalidPackage,
    removeInvalidPackage,
} from '_src/ui/app/redux/slices/valid';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Typography from '_src/ui/app/shared/typography/Typography';

export type CoinProps = {
    type: string;
    balance: string;
    replaceUrl?: boolean;
    edit?: boolean;
};

function CoinBalance({ type, balance, replaceUrl, edit }: CoinProps) {
    const dispatch = useAppDispatch();
    const { invalidPackages } = useAppSelector(({ valid }) => valid);

    const navigate = useNavigate();
    const location = useLocation();
    const { featureFlags } = useDependencies();
    const [
        balanceFormatted,
        symbol,
        usdAmount,
        name,
        icon,
        verifiedBridgeToken,
        ,
        hasConversion,
    ] = useFormatCoin(balance, type, 4);

    const hidden = useMemo(
        () => invalidPackages.includes(type?.split('::')[0] ?? ''),
        [invalidPackages, type]
    );

    const isSendAmountPage = useMemo(
        () => location.pathname === '/send/amount',
        [location]
    );

    const sendUrl = useMemo(
        () =>
            `/send/${
                isSendAmountPage ? 'amount' : 'recipient'
            }?${new URLSearchParams({ type }).toString()}`,
        [isSendAmountPage, type]
    );

    const updateUrl = useCallback(() => {
        navigate(sendUrl, { replace: replaceUrl });
    }, [navigate, sendUrl, replaceUrl]);

    const onImageError = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.style.opacity = '0';
    }, []);

    const toggleDisplay = useCallback(async () => {
        const packageId = type.split('::')[0];
        if (hidden) {
            await dispatch(removeInvalidPackage(packageId));
        } else {
            await dispatch(addInvalidPackage(packageId));
        }
    }, [dispatch, hidden, type]);

    if (hidden && !edit) return <></>;

    return (
        <div
            className={`${
                edit
                    ? 'bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary rounded-lg'
                    : ''
            }`}
        >
            <button
                onClick={updateUrl}
                className={`${
                    hidden ? 'opacity-20' : ''
                } flex w-full items-center justify-between py-2 pl-2 pr-4 rounded-[10px] bg-ethos-light-gray dark:bg-ethos-dark-background-secondary`}
            >
                <div className="flex gap-4 items-center">
                    {icon ? (
                        <img
                            src={icon}
                            alt={`coin-${symbol}`}
                            height={39}
                            width={39}
                            onError={onImageError}
                        />
                    ) : symbol === 'SUI' ? (
                        <Sui />
                    ) : (
                        <UnknownToken />
                    )}
                    <div className="flex flex-col justify-start text-left">
                        <BodyLarge isSemibold>
                            {truncateString(name, 12)}
                        </BodyLarge>
                        {verifiedBridgeToken && (
                            <Body isTextColorMedium className="!text-xs">
                                <a
                                    href="https://docs.sui.io/learn/sui-bridging"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Verified Bridge Token
                                </a>
                            </Body>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-end text-right">
                    <BodyLarge isSemibold>
                        {balanceFormatted} {symbol}
                    </BodyLarge>
                    {symbol === 'SUI' &&
                        featureFlags.showUsd &&
                        hasConversion && (
                            <div className="flex items-center text-base text-slate-800 dark:text-slate-300">
                                <Typography
                                    className={'text-[12px] leading-[12px]'}
                                >
                                    ≈ {usdAmount} USD
                                </Typography>
                            </div>
                        )}
                </div>
            </button>
            {edit && (
                <div
                    className="p-3 cursor-pointer flex gap-1 items-center justify-center"
                    onClick={toggleDisplay}
                >
                    <Body>{hidden ? 'Hidden' : 'Displayed'}:</Body>
                    <Body className="underline text-ethos-light-primary-light dark:text-ethos-dark-primary-dark">
                        {hidden ? 'Show' : 'Hide'}
                    </Body>
                </div>
            )}
        </div>
    );
}

export default memo(CoinBalance);
