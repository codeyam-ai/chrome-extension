import crypto from "crypto";

import { decrypt, encrypt } from "./password";

Object.defineProperty(global, "crypto", {
  value: {
    getRandomValues: (arr: Uint8Array) =>
      new Uint8Array(crypto.randomBytes(arr.length)),
  },
});

describe("password", () => {
  it("encrypts and decryps properly", () => {
    const text = "this is some sample text";
    const passphrase = "123456passphrase654321";

    const encryptedData = encrypt(text, passphrase);
    const { saltString, nonceString, encryptedText } =
      JSON.parse(encryptedData);

    expect(saltString).toBeDefined();
    expect(nonceString).toBeDefined();
    expect(encryptedText).toBeDefined();
    expect(encryptedText).not.toBe(text);

    const decryptedText = decrypt(encryptedData, passphrase);
    expect(decryptedText).toBe(text);
  });
});
