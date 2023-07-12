import { useQuery } from '@tanstack/react-query';
import account from '../redux/slices/account';
import { isEqual } from 'lodash-es';
import { getAllCustomizationsFromSeed } from '_src/shared/utils/customizationsSync/getAllCustomizationsFromSeed';
import { AccountInfo } from '../KeypairVault';
import useAppSelector from './useAppSelector';
import { api } from '../redux/store/thunk-extras';

const useAccountCustomizations = () => {
    const mnemonic = useAppSelector(
        ({ account }) => account.createdMnemonic || account.mnemonic
    );

    const provider = api.instance.fullNode;

    const result = useQuery({
        queryKey: ['accountCustomizations'],
        queryFn: async () => {
            if (!mnemonic) return null;

            const latestServerCustomizations =
                await getAllCustomizationsFromSeed(mnemonic ?? '', provider);

            // if (
            //     latestServerCustomizations &&
            //     !isEqual(latestServerCustomizations, accountCustomizations)
            // ) {
            //     const mergedCustomizations = {
            //         ...accountCustomizations,
            //         ...latestServerCustomizations,
            //     };

            //     await updateAllAccountCustomizationsLocally(
            //         mergedCustomizations
            //     );

            //     return mergedCustomizations;
            // }
            // }
            return { test: latestServerCustomizations };
        },
        enabled: !!mnemonic && !!provider,
        refetchInterval: 3000, // 3 seconds
    });

    return result;
};

export default useAccountCustomizations;
