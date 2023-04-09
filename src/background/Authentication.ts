import { toB64 } from '@mysten/bcs';

import { getEncrypted, setEncrypted } from '_src/shared/storagex/store';
import { simpleApiCall } from '_src/shared/utils/simpleApiCall';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

class Authentication {
    private _accountInfos: AccountInfo[] | null = null;
    private _accessToken: string | null = null;

    public set(accessToken: string | null) {
        this._accessToken = accessToken;
    }

    public async getAccountInfos(force?: boolean): Promise<AccountInfo[]> {
        if (!this._accessToken) return this._accountInfos || [];

        if (!force && this._accountInfos) return this._accountInfos;

        const accountsString = await getEncrypted({
            key: 'accountInfos',
            session: false,
            strong: false,
        });

        let accounts;
        if (!force && accountsString) {
            accounts = JSON.parse(accountsString);
        } else {
            const { json, status } = await simpleApiCall(
                'wallet/accounts',
                'POST',
                this._accessToken || '',
                { chain: 'sui' }
            );

            if (status !== 200) {
                return [];
            }

            accounts = json.accounts;
        }
        this._accountInfos = accounts;

        await setEncrypted({
            key: 'accountInfos',
            value: JSON.stringify(accounts),
            session: false,
            strong: false,
        });

        return accounts;
    }

    public async createAccount(index: number): Promise<AccountInfo | null> {
        if (!this._accessToken) return null;

        const chain = 'sui';
        const { json, status } = await simpleApiCall(
            'accounts/create',
            'POST',
            this._accessToken || '',
            { index, chain }
        );

        if (status !== 200) {
            return null;
        }

        return json.accounts.find((a: AccountInfo) => a.chain === chain);
    }

    public async updateAccountInfos(accountInfos: AccountInfo[]) {
        if (!this._accessToken) return;

        await simpleApiCall(
            'accounts/update',
            'POST',
            this._accessToken || '',
            { accountInfos }
        );
    }

    public async sign(address: string, dataToSign: Uint8Array) {
        if (!this._accessToken) return;

        const { json, status } = await simpleApiCall(
            'transactions/sign',
            'POST',
            this._accessToken || '',
            {
                network: 'sui',
                walletAddress: address,
                dataToSign: toB64(dataToSign),
            }
        );

        if (status !== 200) {
            return;
        }

        const { signature } = json;

        return signature;
    }
}

const authentication = new Authentication();

export default authentication;
