import { authApiCall } from './ethosPlatformApiCall';
import signMessageOnUsersBehalf from '_src/shared/utils/customizationsSync/signMessageOnUsersBehalf';

import type { WalletSigner } from '_src/shared/cryptography/WalletSigner';

async function getJwtWithSigner(signer: WalletSigner | null): Promise<string> {
    const dataToSign = {
        tenantId: process.env.TENANT_ID || '',
        timestamp: Date.now(),
    };

    const dataToSignBase64 = Buffer.from(JSON.stringify(dataToSign)).toString(
        'base64'
    );

    const txResult = await signMessageOnUsersBehalf(signer, dataToSignBase64);

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

    if (!res.json) throw new Error('No json in response');

    const { jwt } = res.json;

    return jwt;
}

export default getJwtWithSigner;
