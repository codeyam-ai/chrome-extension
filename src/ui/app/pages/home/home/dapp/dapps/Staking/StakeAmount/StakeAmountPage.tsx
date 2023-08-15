import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useSearchParams } from 'react-router-dom';

import StakeAmountForm from './StakeAmountForm';
import { buildStakeAmountValidationSchema } from './buildStakeAmountValidationSchema';
import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import { useValidatorsWithApy } from '_src/ui/app/hooks/staking/useValidatorsWithApy';
import { useCoin, useGas } from '_src/ui/app/pages/home/transfer-coin-amount';
import { accountAggregateBalancesSelector } from '_src/ui/app/redux/slices/account';

const StakeAmountPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const validatorSuiAddress = searchParams.get('validator');

    const { data: validators } = useValidatorsWithApy();

    const validator = useMemo(() => {
        return validators && validators[validatorSuiAddress || ''];
    }, [validatorSuiAddress, validators]);

    const aggregateBalances = useAppSelector(accountAggregateBalancesSelector);
    const suiBalanceUnformatted = aggregateBalances[SUI_TYPE_ARG] ?? 0;
    const [formattedSuiBalance] = useFormatCoin(
        suiBalanceUnformatted,
        SUI_TYPE_ARG
    );

    const coin = useCoin({ aggregateBalances, coinType: SUI_TYPE_ARG });
    const gas = useGas({ coin, aggregateBalances });

    const { locale } = useIntl();

    const validationSchema = useMemo(
        () => buildStakeAmountValidationSchema({ coin, gas, locale }),
        [coin, gas, locale]
    );

    const onHandleSubmit = useCallback(
        async ({ amount }: { amount: number | string }) => {
            navigate(
                `/home/staking/review?${new URLSearchParams({
                    validator: validatorSuiAddress ?? '',
                    amount: amount.toString(),
                }).toString()}`
            );
        },
        [navigate, validatorSuiAddress]
    );

    if (!validator) {
        // LOADING
        return <></>;
    }

    return (
        <Formik
            initialValues={{
                amount: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onHandleSubmit}
            validateOnMount={true}
            initialErrors={true}
        >
            <StakeAmountForm
                validator={validator}
                formattedSuiBalance={formattedSuiBalance}
            />
        </Formik>
    );
};

export default StakeAmountPage;
