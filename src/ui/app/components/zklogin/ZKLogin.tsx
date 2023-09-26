import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import {
    generateNonce,
    generateRandomness,
    jwtToAddress,
} from '@mysten/zklogin';

import { getOAuthUrl, OAuthType } from './urls.oauth';
import { extractJwtFromUrl } from './utils';

import type { ZkSignatureInputs } from './bcs';
import type { SuiClient } from '@mysten/sui.js/client';
import { getSaltServiceUrl } from './urls.saltService';

type Proof = ZkSignatureInputs;

export type ZkData = {
    maxEpoch: number;
    epkBigInt: bigint;
    randomness: bigint;
    nonce: string;
    jwt: string;
    salt: bigint;
    address: string;
    proof: Proof;
};

export const Zk = {
    async run(client: SuiClient): Promise<ZkData | null> {
        console.log('starting Zk.run()...');

        const latestSuiSystemState = await client.getLatestSuiSystemState();
        const currentEpoch = parseInt(latestSuiSystemState.epoch);
        const lifetime = 2;
        const maxEpoch = currentEpoch + lifetime;

        const ephemeralKeyPair = new Ed25519Keypair();
        const epk = ephemeralKeyPair.getPublicKey();

        const epkBytes = epk.toRawBytes();
        const epkHex = Buffer.from(epkBytes).toString('hex');
        const epkBigInt = BigInt(`0x${epkHex}`);

        const randomness = generateRandomness();

        const nonce = generateNonce(
            ephemeralKeyPair.getPublicKey(),
            maxEpoch,
            randomness
        );

        const { jwt } = await getJwtViaOAuthFlow({ nonce });
        if (!jwt) return null;

        const { salt } = await getSalt({ jwt });
        console.log('salt', salt);
        if (!salt) return null;

        const address = jwtToAddress(jwt, salt);

        const { proof } = await getProof({
            jwt,
            ephemeralPublicKey: epkBigInt,
            maxEpoch,
            randomness,
            salt,
        });
        console.log('proof', proof);

        const zkData: ZkData = {
            maxEpoch,
            epkBigInt,
            randomness,
            nonce,
            jwt,
            salt,
            address,
            proof,
        };
        console.log('zkData', zkData);

        return zkData;
    },
};

async function getJwtViaOAuthFlow({
    nonce,
}: {
    nonce: string;
}): Promise<{ jwt: string | null }> {
    const oAuthUrl = getOAuthUrl({ type: OAuthType.DevTest, nonce });

    const responseUrl = await chrome.identity.launchWebAuthFlow({
        url: oAuthUrl,
        interactive: true,
    });
    if (!responseUrl) return { jwt: null };

    const jwt = extractJwtFromUrl(responseUrl);
    return { jwt };
}

async function getSalt({
    jwt,
}: {
    jwt: string;
}): Promise<{ salt: bigint | null }> {
    const saltServiceUrl = getSaltServiceUrl({ env: 'production' });

    const response = await fetch(`${saltServiceUrl}/get_salt`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ jwt }),
    });

    const json = await response.json();
    const salt = BigInt(json.salt);

    return { salt };
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace ProofService {
    export interface Payload {
        jwt: string;
        extendedEphemeralPublicKey: bigint;
        maxEpoch: number;
        jwtRandomness: bigint;
        salt: bigint;
        keyClaimName: 'sub';
    }

    export interface PayloadJson {
        jwt: string;
        extendedEphemeralPublicKey: string;
        maxEpoch: number;
        jwtRandomness: string;
        salt: string;
        keyClaimName: 'sub';
    }
}

/**
 * ## Curl example of generating proof
 *
 * https://docs.sui.io/build/zk_login#get-the-zero-knowledge-proof
 *
 * curl -X POST http://185.209.177.123:8000/test/zkp -H 'Content-Type: application/json' -d '{\"jwt\":\"$JWT_TOKEN\",\"eph_public_key\":\"84029355920633174015103288781128426107680789454168570548782290541079926444544\",\"max_epoch\":10,\"jwt_randomness\":\"100681567828351849884072155819400689117\",\"salt\":\"20465832301516329261119809412953969078\",\"key_claim_name\":\"sub\"}'
 *
 * Response: "{\"proof_points\":{\"pi_a\":[\"15675063703917306325241627795287749939385019512632064342667007391710348766801\",\"17181586432929941053870961220927806940602908713115856882556485894958715666224\",\"1\"],\"pi_b\":[[\"7957560505670729816220496782509944389088563119747730948580966015066725699783\",\"11716659169018092876695088851694241024612269611905606895704710420228856308439\"],[\"18606955817386159093439044748720418927075182249276458107282460969333270722832\",\"19144697919432449583198138975806802711756124977312904713863493730816522902497\"],[\"1\",\"0\"]],\"pi_c\":[\"12016781044283108691697360278171375649064474873077711188401276911089485035377\",\"10870715344064672680295536378392096158902788441186022533456372715718154947718\",\"1\"]},\"address_seed\":\"18404400811258979351843554038529324719581180024248900217069822820095974835369\",\"claims\":[{\"name\":\"iss\",\"value_base64\":\"wiaXNzIjoiaHR0cHM6Ly9pZC50d2l0Y2gudHYvb2F1dGgyIiw\",\"index_mod_4\":2},{\"name\":\"aud\",\"value_base64\":\"yJhdWQiOiJyczFiaDA2NWk5eWE0eWR2aWZpeGw0a3NzMHVocHQiLC\",\"index_mod_4\":1}],\"header_base64\":\"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEifQ\"}"
 *
 * ## Alternative
 *
 * https://docs.sui.io/build/zk_login#can-i-run-my-own-zk-proving-service
 *
 * We could host the mysten (rust) binary ourselves, though I don't know where it is.
 *
 */
async function getProof({
    jwt,
    ephemeralPublicKey,
    maxEpoch,
    randomness,
    salt,
}: {
    jwt: string;
    ephemeralPublicKey: bigint;
    maxEpoch: number;
    randomness: bigint;
    salt: bigint;
}): Promise<{ proof: Proof }> {
    const payload: ProofService.Payload = {
        jwt,
        extendedEphemeralPublicKey: ephemeralPublicKey,
        maxEpoch: maxEpoch,
        jwtRandomness: randomness,
        salt,
        keyClaimName: 'sub',
    };

    const payloadJson: ProofService.PayloadJson = {
        ...payload,
        extendedEphemeralPublicKey:
            payload.extendedEphemeralPublicKey.toString(),
        jwtRandomness: payload.jwtRandomness.toString(),
        salt: payload.salt.toString(),
    };

    const MYSTEN_PROVING_SERVICE_URL =
        'https://prover.mystenlabs.com/v1';

    const response = await fetch(MYSTEN_PROVING_SERVICE_URL, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(payloadJson),
    });

    const json = await response.json();

    return { proof: json };
}

/**
 * `inputs` I'm pretty sure is just the proof payload
 */
// async function signAndExecuteTxWithZk({
//     client,
//     txb,
//     ephKeyPair, // or ZKData
// }: {
//     client: SuiClient;
//     txb: TransactionBlock;
//     ephKeyPair: Ed25519Keypair;
// }) {
//     const { bytes, signature: userSignature } = await txb.sign({
//         client,
//         signer: ephKeyPair,
//     });

//     const zkSignature = getZkSignature({
//         inputs,
//         maxEpoch,
//         userSignature,
//     });

//     client.executeTransactionBlock({
//         transactionBlock: bytes,
//         signature: zkSignature,
//     });
// }
