
import { toB64 } from "@mysten/bcs";
import { SuiClient } from "@mysten/sui.js/client";

import { EthosSigner } from "../EthosSigner";
import { simpleApiCall } from "_src/shared/utils/simpleApiCall";

jest.mock("@mysten/sui.js/client", () => {
    return {
        SuiClient: jest.fn().mockImplementation(() => {
            return {
                ...jest.requireActual("@mysten/sui.js/client"),
                resolveNameServiceAddress: jest.fn(),
                getRpcApiVersion: jest.fn(),
                getCoins: jest.fn(),
                getAllCoins: jest.fn(),
            };
        }),
        getFullnodeUrl: jest.fn(),
    };
});

describe("EthosSigner", () => {
  const simpleApiCallMock = (simpleApiCall as jest.MockedFunction<typeof simpleApiCall>)
  const client = new SuiClient({ url: "test-url" });
  const address = "test-address";
  const accessToken = "test-token";
  const testSigner = new EthosSigner(address, accessToken, client);
  const data = new Uint8Array([1, 2, 3, 4, 5]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getAddress should return address", async () => {
    const result = await testSigner.getAddress();
    expect(result).toEqual(address);
  });

  it("signData should call simpleApiCall and return signature", async () => {
    simpleApiCallMock.mockImplementation(() =>
      Promise.resolve({ json: { signature: "test-signature" }, status: 200 })
    );

    const result = await testSigner.signData(data);
    expect(result).toEqual("test-signature");
    expect(simpleApiCallMock).toHaveBeenCalledTimes(1);
    expect(simpleApiCallMock).toHaveBeenCalledWith("transactions/sign", "POST", accessToken, {
      network: "sui",
      walletAddress: address,
      dataToSign: toB64(data),
    });
  });

  it("signData should throw error if status not equal to 200", async () => {
    simpleApiCallMock.mockImplementation(() =>
      Promise.resolve({ json: { signature: "test-signature" }, status: 201 })
    );
    await expect(testSigner.signData(data)).rejects.toThrow("Signing error: 201");
    expect(simpleApiCallMock).toHaveBeenCalledTimes(1);
  });

  it("connect should return new instance of EthosSigner", () => {
    const newSigner = testSigner.connect(client);
    expect(newSigner).toBeInstanceOf(EthosSigner);
  });
});