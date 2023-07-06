import jwt_decode from 'jwt-decode';
import { useCallback, useContext } from 'react';

import { JwtContext } from './JwtProvider';
import getJwt from './getJwt';

import type { RawSigner } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import { useAppSelector } from '_src/ui/app/hooks';

export const useJwt = () => {
    const [cachedJwt, setCachedJwt] = useContext(JwtContext);
    const { connectToLedger } = useSuiLedgerClient();
    const {
        activeAccountIndex,
        accountInfos,
        address: activeAddress,
        authentication,
        passphrase,
    } = useAppSelector(({ account }) => account);

    const getCachedJwt = useCallback(async () => {
        let token = activeAddress ? cachedJwt[activeAddress] : undefined;

        try {
            if (!token && activeAddress) {
                token = await getJwt(
                    connectToLedger,
                    passphrase || '',
                    authentication,
                    activeAddress,
                    accountInfos,
                    activeAccountIndex
                );
                setCachedJwt(token, activeAddress);
            }

            const { exp } = jwt_decode(token || '') as {
                exp?: number;
            };

            const currentTimestamp = Math.floor(new Date().getTime() / 1000);
            const tokenIsExpired = exp && exp < currentTimestamp;

            if (tokenIsExpired && activeAddress) {
                token = await getJwt(
                    connectToLedger,
                    passphrase || '',
                    authentication,
                    activeAddress,
                    accountInfos,
                    activeAccountIndex
                );
                setCachedJwt(token, activeAddress);
            }
        } catch (error) {
            console.log('error decoding JWT', error);
            if (activeAddress) {
                token = await getJwt(
                    connectToLedger,
                    passphrase || '',
                    authentication,
                    activeAddress,
                    accountInfos,
                    activeAccountIndex
                );
                setCachedJwt(token, activeAddress);
            }
        }

        return token || '';
    }, [
        accountInfos,
        activeAccountIndex,
        activeAddress,
        authentication,
        cachedJwt,
        connectToLedger,
        passphrase,
        setCachedJwt,
    ]);

    return { getCachedJwt };
};

export default useJwt;
