import { createContext, useState } from 'react';

import type { ReactNode } from 'react';

export const JwtContext = createContext<
    [
        { [address: string]: string },
        (jwt: string, address: string) => void
    ]
>([{}, () => null]);

export const JwtProvider = ({ children }: { children: ReactNode }) => {
    const [cachedJwt, setCachedJwt] = useState<{
        [address: string]: string;
    }>({});

    const setJwtForAddress = (jwt: string, address: string) => {
        setCachedJwt((prevState) => ({ ...prevState, [address]: jwt }));
    };

    return (
        <JwtContext.Provider value={[cachedJwt, setJwtForAddress]}>
            {children}
        </JwtContext.Provider>
    );
};

export default JwtProvider;
