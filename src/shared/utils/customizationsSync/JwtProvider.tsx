import { createContext, useState } from 'react';

import type { ReactNode } from 'react';

export const JwtContext = createContext<
    [string | undefined, (jwt: string) => void]
>([undefined, () => null]);

export const JwtProvider = ({ children }: { children: ReactNode }) => {
    const [cachedJwt, setCachedJwt] = useState<string | undefined>();

    return (
        <JwtContext.Provider value={[cachedJwt, setCachedJwt]}>
            {children}
        </JwtContext.Provider>
    );
};

export default JwtProvider;
