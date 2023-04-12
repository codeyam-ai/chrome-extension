import { SUI_TYPE_ARG } from '@mysten/sui.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import { buildValidationSchema } from '_src/ui/app/pages/home/transfer-coin-amount/buildValidationSchema';
import { accountAggregateBalancesSelector } from '_src/ui/app/redux/slices/account';
import { api } from '_src/ui/app/redux/store/thunk-extras';

import type { SuiValidatorSummary } from '@mysten/sui.js';
import { useCoin, useGas } from '_src/ui/app/pages/home/transfer-coin-amount';
import StakeAmountForm from './StakeAmountForm';
import { Formik } from 'formik';

const StakeAmountPage: React.FC = () => {
    const [amountToStake, setAmountToStake] = useState<number>();
    const [validators, setValidators] = useState<SuiValidatorSummary[]>([]);
    const [searchParams] = useSearchParams();
    const validatorSuiAddress = searchParams.get('validator');
    const validator = useMemo(() => {
        return validators.find((v) => v.suiAddress === validatorSuiAddress);
    }, [validatorSuiAddress, validators]);
    const aggregateBalances = useAppSelector(accountAggregateBalancesSelector);
    const suiBalanceUnformatted = aggregateBalances[SUI_TYPE_ARG] ?? 0;
    const [formattedSuiBalance] = useFormatCoin(
        suiBalanceUnformatted,
        SUI_TYPE_ARG
    );
    const coin = useCoin({ aggregateBalances });
    const gas = useGas({ coin, aggregateBalances });

    const { locale } = useIntl();

    const validationSchema = useMemo(
        () => buildValidationSchema({ coin, gas, locale }),
        [coin, gas, locale]
    );

    const onHandleSubmit = useCallback(
        async ({ amount }: { amount: number }) => {
            console.log('amount submitted from form :>> ', amount);
        },
        []
    );

    useEffect(() => {
        // NOTE look into useQuery for fetching validators
        const fetchValidators = async () => {
            const provider = api.instance.fullNode;
            const res = await provider.getLatestSuiSystemState();
            setValidators(res.activeValidators);
        };
        fetchValidators();
    }, []);

    if (!validator) {
        // LOADING
        return <></>;
    }

    return (
        <Formik
            initialValues={{
                amount: 0,
            }}
            validationSchema={validationSchema}
            onSubmit={onHandleSubmit}
        >
            <StakeAmountForm
                validator={validator}
                formattedSuiBalance={formattedSuiBalance}
            />
        </Formik>
    );
};

export default StakeAmountPage;
