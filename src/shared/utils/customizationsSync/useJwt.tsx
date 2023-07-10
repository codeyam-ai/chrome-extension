import jwt_decode from 'jwt-decode';
import { useCallback, useContext } from 'react';

import { JwtContext } from './JwtProvider';
import getJwt from './getJwt';

import type { RawSigner, SuiAddress } from '@mysten/sui.js';
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

    const getCachedJwt = useCallback(
        async (_address?: SuiAddress, _accountIndex?: number) => {
            const address = _address || activeAddress;
            const accountIndex = _accountIndex || activeAccountIndex;

            let token = address ? cachedJwt[address] : undefined;

            try {
                if (!token && address) {
                    token = await getJwt(
                        connectToLedger,
                        passphrase || '',
                        authentication,
                        address,
                        accountInfos,
                        accountIndex
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
                        address,
                        accountInfos,
                        accountIndex
                    );
                    setCachedJwt(token, address);
                }
            } catch (error) {
                console.log('error decoding JWT', error);
                if (address) {
                    token = await getJwt(
                        connectToLedger,
                        passphrase || '',
                        authentication,
                        address,
                        accountInfos,
                        accountIndex
                    );
                    setCachedJwt(token, address);
                }
            }

            return token || '';
        },
        [
            accountInfos,
            activeAccountIndex,
            activeAddress,
            authentication,
            cachedJwt,
            connectToLedger,
            passphrase,
            setCachedJwt,
        ]
    );

    return { getCachedJwt };
};

export default useJwt;
