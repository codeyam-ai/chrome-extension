import { ArrowRightCircleIcon } from '@heroicons/react/20/solid';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';

import Continue from './NextStep';
import FromTo from './FromTo';
import Header from './Header';
import Steps from './Steps';
import TransactionBody from './TransactionBody';
import Warning from './Warning';
import Sui from '../../home/tokens/Sui';
import UnknownToken from '../../home/tokens/UnknownToken';
import Loading from '_src/ui/app/components/loading';
import { useFormatCoin } from '_src/ui/app/hooks';

import type { BalanceReduction } from '../lib/analyzeChanges';
import type { RawSigner } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';

const SimpleCoinTransfer = ({
    signer,
    reduction,
}: {
    signer: RawSigner | EthosSigner;
    reduction: BalanceReduction;
}) => {
    const to = reduction.recipient;
    const [balance, setBalance] = useState<string>('0');

    const loading = useMemo(() => balance === '0', [balance]);

    const absReduction = useMemo(
        () => new BigNumber(reduction.amount).abs(),
        [reduction]
    );
    const [formatted, symbol, dollars, name, iconUrl] = useFormatCoin(
        absReduction.toString(),
        reduction.type
    );

    const [formattedRemainder] = useFormatCoin(
        new BigNumber(balance).plus(absReduction).toString(),
        reduction.type
    );

    useEffect(() => {
        const getBalance = async () => {
            if (!signer) return;
            const owner = await signer.getAddress();
            const balance = await signer.provider.getBalance({
                owner,
                coinType: reduction.type,
            });
            setBalance(balance.totalBalance.toString());
        };

        getBalance();
    }, [signer, reduction]);

    if (!to) return <></>;

    return (
        <Loading loading={loading} big={true} resize={true}>
            <Header>
                <Warning>
                    This transaction will reduce your {name} balance by{' '}
                    {formatted}. Your remaining balance will be{' '}
                    {formattedRemainder} {name}.
                </Warning>
            </Header>
            <TransactionBody>
                <div className="flex flex-col items-center gap-1 text-lg">
                    <div
                        className="relative"
                        style={{ height: '60px', width: '60px' }}
                    >
                        <div
                            className="absolute bottom-0 left-0 bg-black rounded-full"
                            style={{ height: '60px', width: '60px' }}
                        />
                        <div className="absolute bottom-1 left-0">
                            {iconUrl ? (
                                <img
                                    src={iconUrl}
                                    alt={`coin-${symbol}`}
                                    height={60}
                                    width={60}
                                />
                            ) : symbol === 'SUI' ? (
                                <Sui width={60} />
                            ) : (
                                <UnknownToken />
                            )}
                        </div>
                        <ArrowRightCircleIcon
                            color="#9040F5"
                            className="bg-white absolute -bottom-1 left-10 rounded-full"
                            height={30}
                        />
                    </div>
                    <div className="font-light">Confirm your want to send</div>
                    <div className="font-semibold">
                        {formatted} {symbol.toUpperCase()}
                    </div>
                    <div className="text-[#74777C] text-base">≈ {dollars}</div>
                </div>
            </TransactionBody>
            <FromTo to={to}></FromTo>
            <Continue />
            <Steps activeStep={0} stepCount={2} />
        </Loading>
    );
};

export default SimpleCoinTransfer;
