import { useMemo } from 'react';

import useAppSelector from './useAppSelector';
import { NetworkName } from '_src/enums/network';

export default function useDappUrl(
    dappUrls: Record<string, string> | undefined
): { dappUrl: string | undefined; isLocal: boolean } {
    const [selectedApiEnv, customRPC] = useAppSelector(({ app }) => [
        app.apiEnv,
        app.customRPC,
    ]);

    const dappUrl = useMemo(() => {
        if (!dappUrls) {
            return undefined;
        }
        if (customRPC) {
            return dappUrls['CUSTOM_RPC'];
        }
        if (selectedApiEnv === 'testNet') {
            return dappUrls[NetworkName.TESTNET];
        }
        if (selectedApiEnv === 'devNet') {
            return dappUrls[NetworkName.DEVNET];
        }
        return undefined;
    }, [customRPC, dappUrls, selectedApiEnv]);

    const isLocal = useMemo(() => {
        if (!dappUrl) {
            return false;
        }
        return !dappUrl.startsWith('http');
    }, [dappUrl]);

    return { dappUrl, isLocal };
}
