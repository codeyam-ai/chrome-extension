import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import {
    generateNonce,
    generateRandomness,
    getZkSignature,
    jwtToAddress,
} from '@mysten/zklogin';
import { useCallback } from 'react';

import { getOAuthUrlGoogle } from './oauthUrls';

import type { SuiClient } from '@mysten/sui.js/client';
import type { TransactionBlock } from '@mysten/sui.js/transactions';

export function ZKLoginButtons() {
    const handleClick = useCallback(() => {
        return;
    }, []);

    return (
        <div className="">
            <button onClick={handleClick}>Sign in with google</button>
        </div>
    );
}

async function zkloginWithGoogle(client: SuiClient) {
    const currentEpochInfo = await client.getCurrentEpoch();

    // how many epochs in addition to current we want
    // the ephemeral keypair to last
    const lifetime = 2;

    // TODO: confirm this `string` is actually representing the epoch number
    // and can therefore be coerced
    const maxEpoch = parseInt(currentEpochInfo.epoch) + lifetime;

    const ephemeralKeypair = new Ed25519Keypair();

    const randomness = generateRandomness();

    const nonce = generateNonce(
        ephemeralKeypair.getPublicKey(),
        maxEpoch,
        randomness
    );

    const googleOAuthUrl = getOAuthUrlGoogle({ nonce });

    const { jwt } = await getOAuthJWT({ url: googleOAuthUrl });
    const { salt } = await getSalt({ jwt: jwt });

    const address = jwtToAddress(jwt, salt);
    const { proof } = await getProof({
        jwt,
        ephPubKey: ephemeralKeypair.getPublicKey().toSuiPublicKey(),
        maxEpoch,
        randomness,
        salt,
    });
}

type JWTPartsWeCareAbout = {
    iss: string; // issuer => I think it's the google id
    aud: string; // audience => I think it's our client_id
    sub: string; // subscriber => iss's uuid for the user => google's uuid for the user
};

/**
 * TODO: figure out what the actual payload response looks like
 */
async function getOAuthJWT({ url }: { url: string }): Promise<{ jwt: string }> {
    const response = await fetch(url);
    return await response.json();
}

/**
 * TODO: create a backend salt service
 */
async function getSalt({ jwt }: { jwt: string }): Promise<{ salt: bigint }> {
    const saltServiceUrl = '';
    const headers = new Headers({ 'content-type': 'application/json' });
    const body = JSON.stringify({ token: jwt });
    const response = await fetch(saltServiceUrl, { headers, body });
    const resBody = (await response.json()) as { salt: string };
    const salt = BigInt(resBody.salt);
    return { salt };
}

type Proof = object;

/**
 * TODO: Integrate with mysten a proving service
 *
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
 * We could host the mysten (rust) binary ourselves.
 *
 */
async function getProof({
    jwt,
    ephPubKey,
    maxEpoch,
    randomness,
    salt,
}: {
    jwt: string;
    ephPubKey: string;
    maxEpoch: number;
    randomness: bigint;
    salt: bigint;
}): Promise<{ proof: Proof }> {
    // The mysten proving service endpoint
    // actually hitting it early might get us blacklisted
    const provingServiceUrl = ''; // 'http://185.209.177.123:8000/test/zkp';

    const headers = new Headers({ 'content-type': 'application/json' });
    const body = JSON.stringify({
        jwt,
        eph_public_key: ephPubKey,
        max_epoch: maxEpoch,
        jwt_randomness: randomness,
        salt,
        key_claim_name: 'sub',
    });
    const response = await fetch(provingServiceUrl, {
        headers,
        method: 'POST',
        body,
    });
    const proof = (await response.json()) as Proof;

    return { proof };
}

async function signAndExecuteTx({
    client,
    txb,
    ephKeyPair,
}: {
    client: SuiClient;
    txb: TransactionBlock;
    ephKeyPair: Ed25519Keypair;
}) {
    const { bytes, signature: userSignature } = await txb.sign({
        client,
        signer: ephKeyPair,
    });

    const zkSignature = getZkSignature({
        inputs,
        maxEpoch,
        userSignature,
    });

    client.executeTransactionBlock({
        transactionBlock: bytes,
        signature: zkSignature,
    });
}
