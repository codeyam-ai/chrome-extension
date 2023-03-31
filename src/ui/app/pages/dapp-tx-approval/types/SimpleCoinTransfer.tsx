import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';

import Continue from './Continue';
import FromTo from './FromTo';
import Header from './Header';
import TransactionBody from './TransactionBody';
import Warning from './Warning';
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
                    <div className="flex flex-col gap-1">
                        <div>
                            This transaction will reduce your {symbol} balance
                            by {formatted}
                        </div>
                        <div>
                            Your remaining balance will be {formattedRemainder}{' '}
                            {symbol}
                        </div>
                    </div>
                </Warning>
            </Header>
            <TransactionBody>
                <div className="flex flex-col items-center gap-1 text-lg">
                    <div className="font-light">Confirm your want to send</div>
                    <div className="font-semibold">
                        {formatted} {symbol.toUpperCase()}
                    </div>
                    <div className="text-[#74777C] text-base">≈ {dollars}</div>
                </div>
            </TransactionBody>
            <FromTo to={to}></FromTo>
            <Continue />
        </Loading>
    );
};

export default SimpleCoinTransfer;
