import { bufferDecode } from './buffer';

export default async function verifySignature(
    publicKey: CryptoKey,
    signature: string,
    challenge: string
): Promise<boolean> {
    const encoder = new TextEncoder();
    const challengeData = encoder.encode(challenge);
    const signatureData = bufferDecode(signature);

    const isValid = await window.crypto.subtle.verify(
        {
            name: 'ECDSA',
            hash: { name: 'SHA-256' }, // Algorithm details must match those used during key generation
        },
        publicKey,
        signatureData,
        challengeData
    );
    return isValid;
}
