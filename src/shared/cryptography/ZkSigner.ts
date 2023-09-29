import { toSerializedSignature } from '@mysten/sui.js/cryptography';
import { type Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { genAddressSeed, getZkSignature } from '@mysten/zklogin';
import { blake2b } from '@noble/hashes/blake2b';
import { decodeJwt } from 'jose';

import { WalletSigner } from './WalletSigner';
import { getCurrentEpoch } from './current-epoch';
import { obfuscate } from './keystore';
import { getEncrypted, setEncrypted } from '../storagex/store';
import networkEnv, { type NetworkEnvType } from '_src/background/NetworkEnv';
import { fromExportedKeypair } from '_src/ui/app/components/zklogin/from-exported-keypair';
import { type ZkProvider } from '_src/ui/app/components/zklogin/providers';

import type { SuiClient } from '@mysten/sui.js/client';
import type {
    ExportedKeypair,
    SerializedSignature,
} from '@mysten/sui.js/cryptography';
import type { ZkSignatureInputs } from '@mysten/zklogin/dist/cjs/bcs';
import type {
    ProofResponse,
    ZkData,
} from '_src/ui/app/components/zklogin/ZKLogin';

type JwtSerializedClaims = {
    email: string | null;
    fullName: string | null;
    firstName: string | null;
    lastName: string | null;
    picture: string | null;
    aud: string;
    iss: string;
    sub: string;
};

type CredentialData = {
    exportedKeypair: ExportedKeypair;
    proof: ProofResponse;
    minEpoch: number;
    maxEpoch: number;
    network: NetworkEnvType;
    randomness: string;
    jwt: string;
};

/*
    For ZkAccountSerialized, the mysten codebase this extends `SerializedAccount`, which is the object that
    gets stored to local storage. It has public key, nickname, etc. We're using the
    Account slice instead. However for now I pasted in the required types (AccountType, SerializedAccount)
*/
// THIS IS FROM THE SUI WALLET
export type AccountType =
    | 'mnemonic-derived'
    | 'imported'
    | 'ledger'
    | 'qredo'
    | 'zk';
// THIS IS FROM THE SUI WALLET
export interface SerializedAccount {
    readonly id: string;
    readonly type: AccountType;
    readonly address: string;
    readonly publicKey: string | null;
    readonly lastUnlockedOn: number | null;
    /**
     * indicates if it's the selected account in the UI (active account)
     */
    readonly selected: boolean;
    readonly nickname: string | null;
    readonly createdAt: number;
}
export interface ZkAccountSerialized extends SerializedAccount {
    type: 'zk';
    provider: ZkProvider;
    /**
     * the salt used to create the account obfuscated
     */
    salt: string;
    /**
     * obfuscated data that contains user info as it was in jwt
     */
    claims: string;
}

export class ZkSigner extends WalletSigner {
    ephemeralKeyPair: Ed25519Keypair;
    address: string | undefined;
    claims: JwtSerializedClaims | undefined;
    zkData: ZkData;

    constructor({ zkData, client }: { zkData: ZkData; client: SuiClient }) {
        super(client);
        this.ephemeralKeyPair = zkData.ephemeralKeyPair;
        this.zkData = zkData;
        this.createNew({ provider: 'google', zkData });
    }

    private async createNew({
        provider,
        zkData,
    }: {
        provider: ZkProvider;
        zkData: ZkData;
    }): Promise<Omit<ZkAccountSerialized, 'id'>> {
        // const jwt = await zkLogin({ provider, prompt: true });
        const jwt = zkData.jwt;
        // const salt = zkData.salt;
        const decodedJWT = decodeJwt(jwt);
        if (!decodedJWT.sub || !decodedJWT.iss || !decodedJWT.aud) {
            throw new Error('Missing jwt data');
        }
        if (Array.isArray(decodedJWT.aud)) {
            throw new Error(
                'Not supported aud. Aud is an array, string was expected.'
            );
        }
        const aud = decodedJWT.aud;
        const claims: JwtSerializedClaims = {
            email: String(decodedJWT.email || '') || null,
            fullName: String(decodedJWT.name || '') || null,
            firstName: String(decodedJWT.given_name || '') || null,
            lastName: String(decodedJWT.family_name || '') || null,
            picture: String(decodedJWT.picture || '') || null,
            aud,
            iss: decodedJWT.iss,
            sub: decodedJWT.sub,
        };

        console.log('claims :>> ', claims);
        this.claims = claims;
        // const address = computeZkAddress({
        //     claimName: 'sub',
        //     claimValue: decodedJWT.sub,
        //     iss: decodedJWT.iss,
        //     aud,
        //     userSalt: BigInt(salt),
        // });
        const address = zkData.address;

        console.log('address :>> ', address);

        this.address = address;

        // in the sui wallet this is not called here (not sure were it gets called when the account is created)
        // await this.#doLogin();
        // await this.#saveCredentialsToStorage({ zkData });

        return Promise.resolve({
            type: 'zk',
            address: address,
            claims: await obfuscate(claims),
            salt: await obfuscate(zkData.salt.toString()),
            provider,
            publicKey: null,
            lastUnlockedOn: null,
            selected: false,
            nickname: claims.email || null,
            createdAt: Date.now(),
        });
    }

    async getAddress(): Promise<string> {
        return this.address || '';
    }

    async signData(data: Uint8Array): Promise<SerializedSignature | any> {
        const digest = blake2b(data, { dkLen: 32 });
        // if (await this.isLocked()) {
        // 	throw new Error('Account is locked');
        // }

        // Currently the SUI wallet saves the CredentialData in a Record with keys being 'mainnet', 'testnet' etc
        // But that errors out in their code so for now going to save just CredentialData
        const credentialsData = await this.getEphemeralValue();
        if (!credentialsData) {
            throw new Error('No credentials data found');
        }
        const currentEpoch = await getCurrentEpoch();
        console.log('currentEpoch in ZkSigner signData :>> ', currentEpoch);

        const { exportedKeypair, proof, maxEpoch, jwt, randomness } =
            credentialsData;

        console.log('got stuff from creds data');
        console.log('exportedKeypair :>> ', exportedKeypair);
        console.log('maxEpoch :>> ', maxEpoch);

        const keyPair = fromExportedKeypair(exportedKeypair);

        console.log('keypair :>> ', keyPair);
        console.log('proof :>> ', proof);
        if (!proof) throw 'no proofs stored';
        console.log('address :>> ', this.address);
        if (!this.address) throw 'no address stored';
        console.log('claims :>> ', this.claims);
        if (!this.claims) throw 'no claims stored';
        // if (!proofs) {
        //     proofs = await this.#generateProofs(
        //         jwt,
        //         BigInt(randomness),
        //         maxEpoch,
        //         keyPair.getPublicKey()
        //     );
        //     credentialsData.proofs = proofs;
        //     // store the proofs to avoid creating them again
        //     const newEphemeralValue = await this.getEphemeralValue();
        //     if (!newEphemeralValue) {
        //         // this should never happen
        //         throw new Error('Missing data, account is locked');
        //     }
        //     // newEphemeralValue[serializeNetwork(activeNetwork)] = credentialsData;
        //     // await this.setEphemeralValue(newEphemeralValue);
        //     await setEncrypted({
        //         key: 'zk-1',
        //         session: false,
        //         strong: false,
        //         value: JSON.stringify(credentialsData),
        //     });
        // }

        const signature = await keyPair.sign(digest);
        const publicKey = keyPair.getPublicKey();

        const userSignature = toSerializedSignature({
            signature: await keyPair.sign(digest),
            signatureScheme: keyPair.getKeyScheme(),
            publicKey: keyPair.getPublicKey(),
        });

        const decodedJWT = decodeJwt(jwt);

        const aud = Array.isArray(decodedJWT.aud)
            ? decodedJWT.aud.at(0)
            : decodedJWT.aud;
        // const inputs: ZkSignatureInputs = {
        //     proof_points: {
        //         pi_a: proof.proofPoints.a,
        //         pi_b: proof.proofPoints.b,
        //         pi_c: proof.proofPoints.c,
        //     },
        //     header_base64: proof.headerBase64,
        //     address_seed: this.address,
        //     claims: [
        //         {
        //             name: 'iss',
        //             value_base64: proof.issBase64Details.value,
        //             index_mod_4: proof.issBase64Details.indexMod4,
        //         },
        //         {
        //             name: 'aud',
        //             value_base64: toB64(
        //                 new TextEncoder().encode(this.claims.aud)
        //             ),
        //             index_mod_4: 1,
        //         },
        //     ],
        // };
        const inputs: ZkSignatureInputs = {
            ...proof,
            addressSeed: genAddressSeed(
                this.zkData.salt,
                'sub',
                decodedJWT.sub ?? '',
                aud ?? ''
            ).toString(),
        };
        const zkSig = getZkSignature({ inputs, maxEpoch, userSignature });

        return zkSig;
    }

    connect(client: SuiClient): WalletSigner {
        return new ZkSigner({ zkData: this.zkData, client });
    }

    protected async getEphemeralValue(): Promise<CredentialData | null> {
        const rawCredentialsData = await getEncrypted({
            key: 'zk',
            session: true,
            strong: false,
        });
        if (!rawCredentialsData) {
            return null;
        }
        const credentialData = JSON.parse(rawCredentialsData) as CredentialData;
        return credentialData;
    }
}

// const jwtStub =
//     'eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjMGI2OTEzZmUxMzgyMGEzMzMzOTlhY2U0MjZlNzA1MzVhOWEwYmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5NDY3MzEzNTIyNzYtcGs1Z2xjZzhjcW8zOG5kYjM5aDdqMDkzZnBzcGh1c3UuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5NDY3MzEzNTIyNzYtcGs1Z2xjZzhjcW8zOG5kYjM5aDdqMDkzZnBzcGh1c3UuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM2OTY1NjQ2MzA2MjM3MzE4MTciLCJoZCI6ImV0aG9zd2FsbGV0Lnh5eiIsImVtYWlsIjoidG9tbXlAZXRob3N3YWxsZXQueHl6IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5vbmNlIjoiYmVPVWVUWVpXb2pTSWgzRlFteXdubU16SVowIiwibmJmIjoxNjk0NjM2ODM2LCJuYW1lIjoiVG9tbXkgV2lsY3playIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLQk9nVjE0OXN5cVBUZlRoWGFiaC12TXB2U3oxNm1Wa3F4b2FyWjYxVE91QT1zOTYtYyIsImdpdmVuX25hbWUiOiJUb21teSIsImZhbWlseV9uYW1lIjoiV2lsY3playIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjk0NjM3MTM2LCJleHAiOjE2OTQ2NDA3MzYsImp0aSI6IjhlZGZmMDIyM2RhYjU2YjY0MmNlMjU2ODYzYjI3YTY4YzIxNTFkOTcifQ.AI89AbyaAZhD2HrXfZwJXv__yoxwE-PgnMpyKX5ehz9TQzCAnYGgLhUHSoGKi2uhB5IWAMGi0_Z-45BBDe1hiTwwA-iC_e7gABANZxBWTOuYWttrzr3VbUMT6jxWVec3EgRxMVT4CHC6WhgjZOjTupVFrJlCFOoWyOWnl3eR1ajbAyeXQpTWbut5iWtOgsi9yid19q_kwy3-GrdVC6xjc3Hrb2fCK1Tw7DHbTpOc4ULI0biA8dresJaVqr580UTS06PQ4URSE6RHWrqSYTdtKNHK6MLsvfp8CV8x3c_J-n4dNUtfHrMBGM8kp5zg4YJE8fJHjDt-JMpfawlq741KPQ';
// const saltStub = '213783213642252539822840878157811945348';
// const decodedJwtStub: JWTPayload = {
//     iss: 'https://accounts.google.com',
//     azp: '946731352276-pk5glcg8cqo38ndb39h7j093fpsphusu.apps.googleusercontent.com',
//     aud: '946731352276-pk5glcg8cqo38ndb39h7j093fpsphusu.apps.googleusercontent.com',
//     sub: '103696564630623731817',
//     hd: 'ethoswallet.xyz',
//     email: 'tommy@ethoswallet.xyz',
//     email_verified: true,
//     nonce: 'beOUeTYZWojSIh3FQmywnmMzIZ0',
//     nbf: 1694636836,
//     name: 'Tommy Wilczek',
//     picture:
//         'https://lh3.googleusercontent.com/a/ACg8ocKBOgV149syqPTfThXabh-vMpvSz16mVkqxoarZ61TOuA=s96-c',
//     given_name: 'Tommy',
//     family_name: 'Wilczek',
//     locale: 'en',
//     iat: 1694637136,
//     exp: 1694640736,
//     jti: '8edff0223dab56b642ce256863b27a68c2151d97',
// };

// This is an unsigned transaction for sending some SUI
const stubDataToSign = new Uint8Array([
    0, 0, 0, 0, 0, 2, 0, 8, 0, 225, 245, 5, 0, 0, 0, 0, 0, 32, 241, 198, 164,
    104, 81, 215, 58, 254, 66, 25, 103, 128, 116, 24, 154, 127, 241, 70, 228,
    174, 219, 59, 117, 84, 48, 137, 159, 209, 132, 243, 7, 17, 2, 2, 0, 1, 1, 0,
    0, 1, 1, 2, 0, 0, 1, 1, 0, 50, 161, 152, 67, 17, 34, 30, 79, 234, 233, 229,
    49, 5, 6, 157, 225, 218, 142, 70, 36, 194, 146, 43, 164, 215, 41, 189, 106,
    201, 27, 159, 209, 1, 226, 155, 21, 126, 91, 146, 246, 221, 130, 126, 114,
    65, 62, 118, 210, 44, 27, 25, 85, 99, 80, 229, 210, 197, 194, 13, 6, 8, 2,
    150, 240, 137, 53, 136, 145, 0, 0, 0, 0, 0, 32, 161, 51, 68, 195, 129, 148,
    91, 192, 149, 102, 66, 221, 34, 47, 18, 251, 110, 201, 30, 62, 236, 196, 61,
    211, 153, 35, 250, 164, 9, 219, 231, 198, 50, 161, 152, 67, 17, 34, 30, 79,
    234, 233, 229, 49, 5, 6, 157, 225, 218, 142, 70, 36, 194, 146, 43, 164, 215,
    41, 189, 106, 201, 27, 159, 209, 232, 3, 0, 0, 0, 0, 0, 0, 64, 171, 60, 0,
    0, 0, 0, 0, 0,
]);

// const proofsStub: PartialZkSignature = {
//     proof_points: {
//         pi_a: [
//             '17948070145290567577569534367197032795952160121538901645187309651256974121090',
//             '5612484770548744233871071579404622163176587443511638625471475946349679575376',
//             '1',
//         ],
//         pi_b: [
//             [
//                 '10679174348209515438812994622136144511408556589312486798105989640961358571493',
//                 '9294642663261017946844031529456074141203277334404665524402152927220253496002',
//             ],
//             [
//                 '2204323869214454390996141971686094138098385069253160203251708242120621092684',
//                 '6981588368132222637231456901768604850198765661278426240714029072874212934072',
//             ],
//             ['1', '0'],
//         ],
//         pi_c: [
//             '9301136315346575512905486181850444622460473138713717577416329628536129738139',
//             '16881064496764686229174928110342841687382592004306066834917346177403479718093',
//             '1',
//         ],
//     },
//     address_seed:
//         '18028501399298930227449860332913100901954313254243201663127646075617746679810',
//     claims: [
//         {
//             name: 'iss',
//             value_base64: 'yJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLC',
//             index_mod_4: 1,
//         },
//         {
//             name: 'aud',
//             value_base64:
//                 'CJhdWQiOiI5NDY3MzEzNTIyNzYtcGs1Z2xjZzhjcW8zOG5kYjM5aDdqMDkzZnBzcGh1c3UuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLC',
//             index_mod_4: 1,
//         },
//     ],
//     header_base64:
//         'eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzOGMwNmM2MjA0NmMyZDk0OGFmZmUxMzdkZDUzMTAxMjlmNGQ1ZDEiLCJ0eXAiOiJKV1QifQ',
// };
