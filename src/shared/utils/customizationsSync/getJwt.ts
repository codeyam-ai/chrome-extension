import getJwtWithSigner from './getJwtWithSigner';
import { type ZkData } from '_src/ui/app/components/zklogin/ZKLogin';
import { getSigner } from '_src/ui/app/helpers/getSigner';

import type SuiLedgerClient from '@mysten/ledgerjs-hw-app-sui';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

async function getJwt(
    connectToLedger: () => Promise<SuiLedgerClient>,
    passphrase: string,
    authentication: string | null,
    zkData: ZkData | null,
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
        zkData,
        activeAccountIndex,
        connectToLedger,
        isNewAddress
    );

    return getJwtWithSigner(signer);
}

export default getJwt;
