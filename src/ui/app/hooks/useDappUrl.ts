import { useMemo } from 'react';

import useAppSelector from './useAppSelector';
import { NetworkName } from '_src/enums/network';

export default function useDappUrl(
    dappUrls: Record<string, string>
): string | undefined {
    const [selectedApiEnv, customRPC] = useAppSelector(({ app }) => [
        app.apiEnv,
        app.customRPC,
    ]);

    return useMemo(() => {
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
}
