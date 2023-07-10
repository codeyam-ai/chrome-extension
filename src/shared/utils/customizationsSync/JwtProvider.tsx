import { createContext, useState } from 'react';

import type { SuiAddress } from '@mysten/sui.js';
import type { ReactNode } from 'react';

export const JwtContext = createContext<
    [
        { [address: SuiAddress]: string },
        (jwt: string, address: SuiAddress) => void
    ]
>([{}, () => null]);

export const JwtProvider = ({ children }: { children: ReactNode }) => {
    const [cachedJwt, setCachedJwt] = useState<{
        [address: SuiAddress]: string;
    }>({});

    const setJwtForAddress = (jwt: string, address: SuiAddress) => {
        setCachedJwt((prevState) => ({ ...prevState, [address]: jwt }));
    };

    return (
        <JwtContext.Provider value={[cachedJwt, setJwtForAddress]}>
            {children}
        </JwtContext.Provider>
    );
};

export default JwtProvider;
