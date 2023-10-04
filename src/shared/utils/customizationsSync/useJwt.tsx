import jwt_decode from 'jwt-decode';
import { useCallback, useContext } from 'react';

import { JwtContext } from './JwtProvider';
import getJwt from './getJwt';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import { useAppSelector } from '_src/ui/app/hooks';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

export const useJwt = () => {
    const [cachedJwt, setCachedJwt] = useContext(JwtContext);
    const { connectToLedger } = useSuiLedgerClient();
    const {
        activeAccountIndex,
        accountInfos: currentAccountInfos,
        address: activeAddress,
        authentication,
        passphrase,
        zkData,
    } = useAppSelector(({ account }) => account);

    const getCachedJwt = useCallback(
        async (
            _address?: string,
            _accountIndex?: number,
            _accountInfos?: AccountInfo[]
        ) => {
            const address = _address || activeAddress;
            const accountIndex = _accountIndex || activeAccountIndex;
            // In the case we need a signer from an account not in current account infos, like when creating a new wallet
            const accountInfos = _accountInfos || currentAccountInfos;

            let token = address ? cachedJwt[address] : undefined;

            try {
                if (!token && address) {
                    token = await getJwt(
                        connectToLedger,
                        passphrase || '',
                        authentication,
                        zkData,
                        address,
                        accountInfos,
                        accountIndex,
                        true
                    );
                    setCachedJwt(token, address);
                }

                const { exp } = jwt_decode(token || '') as {
                    exp?: number;
                };

                const currentTimestamp = Math.floor(
                    new Date().getTime() / 1000
                );
                const tokenIsExpired = exp && exp < currentTimestamp;

                if (tokenIsExpired && address) {
                    token = await getJwt(
                        connectToLedger,
                        passphrase || '',
                        authentication,
                        zkData,
                        address,
                        accountInfos,
                        accountIndex,
                        true
                    );
                    setCachedJwt(token, address);
                }
            } catch (error) {
                if (address) {
                    token = await getJwt(
                        connectToLedger,
                        passphrase || '',
                        authentication,
                        zkData,
                        address,
                        accountInfos,
                        accountIndex,
                        true
                    );
                    setCachedJwt(token, address);
                }
            }

            return token || '';
        },
        [
            activeAccountIndex,
            activeAddress,
            authentication,
            cachedJwt,
            connectToLedger,
            currentAccountInfos,
            passphrase,
            setCachedJwt,
            zkData,
        ]
    );

    return { getCachedJwt };
};

export default useJwt;
