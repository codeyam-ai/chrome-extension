import { getEncrypted, setEncrypted } from "_src/shared/storagex/store";
import simpleApiCall from "_src/shared/utils/simpleApiCall";

import type { AccountInfo } from "_src/ui/app/KeypairVault";

class Authentication {
  private _accountInfos: AccountInfo[] | null = null;
  private _accessToken: string | null = null;

  public set(accessToken: string | null) {
    this._accessToken = accessToken;
  }

  public async getAccountInfos(): Promise<AccountInfo[]> {
    if (this._accountInfos) return this._accountInfos;

    if (!this._accessToken) return [];

    const accountsString = await getEncrypted(
      "accountInfos",
      this._accessToken
    );

    let accounts;
    if (accountsString) {
      accounts = JSON.parse(accountsString);
    } else {
      const { json, status } = await simpleApiCall(
        "wallet/accounts",
        "POST",
        this._accessToken || "",
        JSON.stringify({ network: "sui", chain: "sui" })
      );

      if (status !== 200) {
        return [];
      }

      accounts = json.accounts;
    }

    this._accountInfos = accounts;

    await setEncrypted(
      "accountInfos",
      JSON.stringify(accounts),
      this._accessToken
    );

    return accounts;
  }

  public async createAccount(index: number): Promise<AccountInfo | null> {
    if (!this._accessToken) return null;

    const chain = "sui";
    const { json, status } = await simpleApiCall(
      "accounts/create",
      "POST",
      this._accessToken || "",
      JSON.stringify({ index, chain })
    );

    if (status !== 200) {
      return null;
    }

    return json.accounts.find((a: AccountInfo) => a.chain === chain);
  }

  public async updateAccountInfos(accountInfos: AccountInfo[]) {
    if (!this._accessToken) return;

    await simpleApiCall(
      "accounts/update",
      "POST",
      this._accessToken || "",
      JSON.stringify({ accountInfos })
    );
  }

  public async sign(address: string, txBytes: Uint8Array) {
    if (!this._accessToken) return;

    const { json, status } = await simpleApiCall(
      "transaction/sign",
      "POST",
      this._accessToken || "",
      JSON.stringify({
        network: "sui",
        walletAddress: address,
        populatedTransaction: {
          id: 0,
          transaction: txBytes.toString(),
        },
      })
    );

    if (status !== 200) {
      return;
    }

    const { signedTransaction } = json;

    return {
      signatureScheme: "ED25519",
      signature: signedTransaction.signature,
      pubKey: signedTransaction.pubKey,
    };
  }
}

export default new Authentication();
