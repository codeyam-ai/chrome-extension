import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import CoinBalanceElement from './CoinBalance';
import { LinkType } from '_src/enums/LinkType';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Typography from '_src/ui/app/shared/typography/Typography';

const CoinList = ({
    balances,
    edit = false,
}: {
    balances: Record<string, bigint>;
    edit?: boolean;
}) => {
    return (
        <div className="text-left space-y-2" data-testid="coin-list">
            {Object.keys(balances).map((type: string) => {
                const balance = balances[type];
                return (
                    <CoinBalanceElement
                        key={type}
                        type={type}
                        balance={balance.toString()}
                        edit={edit}
                    />
                );
            })}
            {!!balances[SUI_TYPE_ARG] && (
                <div className={'w-full text-left'}>
                    <Typography isTextColorMedium>
                        Conversion data provided by{' '}
                        <EthosLink
                            type={LinkType.External}
                            to={'https://www.coingecko.com'}
                        >
                            CoinGecko
                        </EthosLink>
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default CoinList;
