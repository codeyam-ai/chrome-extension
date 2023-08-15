import { useQuery } from '@tanstack/react-query';
import { isEqual } from 'lodash';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { saveAccountInfos, setAccountInfos } from '../redux/slices/account';
import { api } from '../redux/store/thunk-extras';
import Authentication from '_src/background/Authentication';
import { getAllCustomizationsFromSeed } from '_src/shared/utils/customizationsSync/getAllCustomizationsFromSeed';

import type { AccountInfo } from '../KeypairVault';

const useAccountCustomizations = () => {
    const mnemonic = useAppSelector(
        ({ account }) => account.createdMnemonic || account.mnemonic
    );
    const { accountInfos, authentication, customizationsSyncPreference } =
        useAppSelector(({ account }) => account);
    const dispatch = useAppDispatch();
    // const { featureFlags } = useDependencies();
    const provider = api.instance.fullNode;

    const result = useQuery({
        queryKey: ['accountCustomizations'],
        queryFn: async () => {
            // console.log('=================');
            // console.log('fetching acc cust...');

            if (!mnemonic) return null;

            const latestServerCustomizations =
                await getAllCustomizationsFromSeed(mnemonic ?? '', provider);

            // console.log(
            //     'latestServerCustomizations :>> ',
            //     latestServerCustomizations
            // );

            const isFirstSyncInProgress =
                Object.keys(latestServerCustomizations).length === 0;
            if (
                latestServerCustomizations === 'deleted' ||
                isFirstSyncInProgress
            ) {
                return null;
            }

            const latestAccountInfos: AccountInfo[] = Object.values(
                latestServerCustomizations
            ) as AccountInfo[];

            if (
                latestServerCustomizations &&
                !isEqual(latestAccountInfos, accountInfos)
            ) {
                // console.log(
                //     'latestAccountInfos are DIFFERENT :>> ',
                //     latestAccountInfos
                // );
                // console.log('current accountInfos :>> ', accountInfos);
                if (authentication) {
                    await Authentication.updateAccountInfos(latestAccountInfos);
                    await dispatch(setAccountInfos(latestAccountInfos));
                    await Authentication.getAccountInfos(true);
                } else {
                    await dispatch(saveAccountInfos(latestAccountInfos));
                }

                return { latestAccountInfos };
            }
            return { latestServerCustomizations };
        },
        enabled: !!mnemonic && !!provider && customizationsSyncPreference,
        refetchInterval: 10000, // 10 seconds
    });

    return result;
};

export default useAccountCustomizations;
