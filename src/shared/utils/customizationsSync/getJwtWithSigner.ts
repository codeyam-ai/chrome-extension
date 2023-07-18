import { authApiCall } from './ethosPlatformApiCall';
import signMessageOnUsersBehalf from '_src/shared/utils/customizationsSync/signMessageOnUsersBehalf';

import type { RawSigner } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';
import type { LedgerSigner } from '_src/shared/cryptography/LedgerSigner';

async function getJwtWithSigner(
    signer: LedgerSigner | EthosSigner | RawSigner | null
): Promise<string> {
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
