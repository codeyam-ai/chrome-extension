import {
    extractGasDataFromErrorBalanceOfGasObjectIsLowerThanGasBudget,
    extractGasDataFromErrorCannotFindGasCoinForSigner,
    extractGasDataFromErrorGasBalanceTooLowToCoverGasBudget,
    extractGasDataFromErrorUnableToFindCoinToCoverGas,
} from '_src/ui/app/pages/dapp-tx-approval/lib/extractGasData';

describe('extractGasDataFromErrorGasBalanceTooLowToCoverGasBudget', () => {
    it('should extract gasBalance and gasBudget from errors that include GasBalanceTooLowToCoverGasBudget', () => {
        const errorMsg =
            'Error: RPC Error: Transaction has non recoverable errors from at least 1/3 of validators: [(GasBalanceTooLowToCoverGasBudget { gas_balance: 50000, gas_budget: 5450000, gas_price: 109 }, [k#a661b673822d259bd90dde2d222a83aa08d68646ffaabae943b49d42de4b4e50c0bc7b5fa3d119b957436dbf63d359640bcc65bcf3f50f8613397b3483f74f3d4755e941d37aa47940a6d6c38e411995c1036d5357b7cb791901764a7a149129, k#aa0bd63a8878f6a688ee28366b6ccf28aa8650e679d9a8ebbd12b46e8f20166323cf8de90160ecb88f0f68b32e3b4c8815';
        const result =
            extractGasDataFromErrorGasBalanceTooLowToCoverGasBudget(errorMsg);
        expect(result?.gasBalance).toBe(50000);
        expect(result?.gasBudget).toBe(5450000);
        expect(result?.gasPrice).toBe(109);
    });
    it('should return null if info is not in given string', () => {
        const errorMsg = 'random error!';
        const result =
            extractGasDataFromErrorGasBalanceTooLowToCoverGasBudget(errorMsg);
        expect(result?.gasBalance).toBe(undefined);
        expect(result?.gasBudget).toBe(undefined);
        expect(result?.gasPrice).toBe(undefined);
    });
});

describe('extractGasDataFromErrorBalanceOfGasObjectIsLowerThanGasBudget', () => {
    it('should extract gasBalance and gasBudget from errors that include "Balance of gas object"... "is lower than gas budget"', () => {
        const errorMsg =
            'Error dev inspect transaction with request type: Error: RPC Error: Balance of gas object 100000 is lower than gas budget: 1020000, with gas price: 102.';
        const result =
            extractGasDataFromErrorBalanceOfGasObjectIsLowerThanGasBudget(
                errorMsg
            );
        expect(result?.gasBalance).toBe(100000);
        expect(result?.gasBudget).toBe(1020000);
        expect(result?.gasPrice).toBe(102);
    });
    it('should return null if info is not in given string', () => {
        const errorMsg = 'random error!';
        const result =
            extractGasDataFromErrorBalanceOfGasObjectIsLowerThanGasBudget(
                errorMsg
            );
        expect(result?.gasBalance).toBe(undefined);
        expect(result?.gasBudget).toBe(undefined);
        expect(result?.gasPrice).toBe(undefined);
    });
});

describe('extractGasDataFromErrorUnableToFindCoinToCoverGas', () => {
    it('should extract gasBudget from errors that include GasBalanceTooLowToCoverGasBudget', () => {
        const errorMsg =
            '"Unable to find a coin to cover the gas budget 84600000"';
        const result =
            extractGasDataFromErrorUnableToFindCoinToCoverGas(errorMsg);
        expect(result?.gasBudget).toBe(84600000);
    });
    it('should return null if info is not in given string', () => {
        const errorMsg = 'random error!';
        const result =
            extractGasDataFromErrorUnableToFindCoinToCoverGas(errorMsg);
        expect(result?.gasBudget).toBe(undefined);
    });
});

describe('extractGasDataFromErrorCannotFindGasCoinForSigner', () => {
    it('should extract gasBudget from errors that include "Cannot find gas coin for signer address"... "with amount sufficient for the budget"', () => {
        const errorMsg =
            'Encountered error when calling RpcTxnDataSerialize for a moveCall transaction for address 1dca6f415e24b4927a7fa3c63345859f2a66ca54 for transaction { "kind": "moveCall", "data": { "packageObjectId": "0x88f243bedb9a612ba456270e2c62b691f608838a", "module": "token_gated_ticket", "function": "redeem_ticket", "typeArguments": [ "0x4c10b61966a34d3bb5c8a8f063e6b7445fc41f93::capy::Capy" ], "arguments": [ "0x421d4a6323a4431fe4a3450009b2440cc837b6b5", "0xbf9147183c9cdfa65c79a3dc512bcca035893746", "0x8493f3bc6da150517bdb012068a07e50e526a0cb" ], "gasBudget": 30000 } }: Error: RPC Error: Cannot find gas coin for signer address [0x1dca6f415e24b4927a7fa3c63345859f2a66ca54] with amount sufficient for the required gas amount [50760000].';
        const result =
            extractGasDataFromErrorCannotFindGasCoinForSigner(errorMsg);
        expect(result?.gasBudget).toBe(50760000);
    });
    it('should return null if info is not in given string', () => {
        const errorMsg = 'random error!';
        const result =
            extractGasDataFromErrorCannotFindGasCoinForSigner(errorMsg);
        expect(result?.gasBudget).toBe(undefined);
    });
});
