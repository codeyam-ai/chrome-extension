import { useQuery } from '@tanstack/react-query';
import { isEqual } from 'lodash-es';

import useAppSelector from './useAppSelector';
import { api } from '../redux/store/thunk-extras';
import { getAllCustomizationsFromSeed } from '_src/shared/utils/customizationsSync/getAllCustomizationsFromSeed';

import type { AccountInfo } from '../KeypairVault';
import Authentication from '_src/background/Authentication';
import useAppDispatch from './useAppDispatch';
import {
    loadAccountInformationFromStorage,
    saveAccountInfos,
    setAccountInfos,
} from '../redux/slices/account';
import { useDependencies } from '_src/shared/utils/dependenciesContext';

const useAccountCustomizations = () => {
    const mnemonic = useAppSelector(
        ({ account }) => account.createdMnemonic || account.mnemonic
    );
    const { accountInfos, authentication } = useAppSelector(
        ({ account }) => account
    );
    const dispatch = useAppDispatch();
    const { featureFlags } = useDependencies();
    const provider = api.instance.fullNode;

    const result = useQuery({
        queryKey: ['accountCustomizations'],
        queryFn: async () => {
            if (!mnemonic) return null;

            const latestServerCustomizations =
                await getAllCustomizationsFromSeed(mnemonic ?? '', provider);

            const latestAccountInfos: AccountInfo[] = Object.values(
                latestServerCustomizations
            ) as AccountInfo[];

            if (
                latestServerCustomizations &&
                !isEqual(latestAccountInfos, accountInfos)
            ) {
                console.log(
                    'latestAccountInfos are DIFFERENT :>> ',
                    latestAccountInfos
                );
                console.log('current accountInfos :>> ', accountInfos);
                if (authentication) {
                    await Authentication.updateAccountInfos(latestAccountInfos);
                    await dispatch(setAccountInfos(latestAccountInfos));
                    await Authentication.getAccountInfos(true);
                } else {
                    await dispatch(saveAccountInfos(latestAccountInfos));
                }

                return { test: latestAccountInfos };
            }
            return { test: latestServerCustomizations };
        },
        enabled: !!mnemonic && !!provider && featureFlags.showWipFeatures,
        refetchInterval: 3000, // 3 seconds
    });

    return result;
};

export default useAccountCustomizations;
