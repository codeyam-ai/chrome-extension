import { authApiCall } from './ethosPlatformApiCall';
import signMessageOnUsersBehalf from '_src/shared/utils/customizationsSync/signMessageOnUsersBehalf';

import type SuiLedgerClient from '@mysten/ledgerjs-hw-app-sui';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

async function getJwt(
    connectToLedger: () => Promise<SuiLedgerClient>,
    passphrase: string,
    authentication: string | null,
    activeAddress: string,
    accountInfos: AccountInfo[],
    activeAccountIndex: number
): Promise<string> {
    const dataToSign = {
        tenantId: '92dd81a5-dd8b-480c-b468-66f69a74c1bc',
        timestamp: Date.now(),
    };

    const dataToSignBase64 = Buffer.from(JSON.stringify(dataToSign)).toString(
        'base64'
    );

    const txResult = await signMessageOnUsersBehalf(
        connectToLedger,
        dataToSignBase64,
        passphrase,
        authentication,
        activeAddress,
        accountInfos,
        activeAccountIndex
    );

    const authReqBody: Record<string, string> = {
        b64Message: dataToSignBase64,
        b64Signature: txResult?.signature ?? '',
    };

    const res = await authApiCall(
        'v1/auth/sui/signature',
        'POST',
        '',
        authReqBody
    );

    const { jwt } = res.json;

    return jwt;
}

export default getJwt;
