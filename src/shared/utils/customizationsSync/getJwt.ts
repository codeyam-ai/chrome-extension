import getJwtWithSigner from './getJwtWithSigner';
import { getSigner } from '_src/ui/app/helpers/getSigner';

import type SuiLedgerClient from '@mysten/ledgerjs-hw-app-sui';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

async function getJwt(
    connectToLedger: () => Promise<SuiLedgerClient>,
    passphrase: string,
    authentication: string | null,
    activeAddress: string,
    accountInfos: AccountInfo[],
    activeAccountIndex: number,
    isNewAddress?: boolean
): Promise<string> {
    const signer = await getSigner(
        passphrase,
        accountInfos,
        activeAddress,
        authentication,
        activeAccountIndex,
        connectToLedger,
        isNewAddress
    );

    return getJwtWithSigner(signer);
}

export default getJwt;
