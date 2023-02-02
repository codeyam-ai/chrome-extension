export const getGasDataFromError = (
    errorMessage: string
): { gasBalance?: number; gasBudget: number; gasPrice?: number } | null => {
    if (errorMessage.includes('GasBalanceTooLowToCoverGasBudget')) {
        return extractGasDataFromErrorGasBalanceTooLowToCoverGasBudget(
            errorMessage
        );
    } else if (
        errorMessage.includes('Balance of gas object') &&
        errorMessage.includes('is lower than gas budget')
    ) {
        return extractGasDataFromErrorBalanceOfGasObjectIsLowerThanGasBudget(
            errorMessage
        );
    } else if (
        errorMessage.includes('Unable to find a coin to cover the gas budget')
    ) {
        return extractGasDataFromErrorUnableToFindCoinToCoverGas(errorMessage);
    } else if (
        errorMessage.includes('Cannot find gas coin for signer address')
    ) {
        return extractGasDataFromErrorCannotFindGasCoinForSigner(errorMessage);
    }
    return null;
};

export const extractGasDataFromErrorGasBalanceTooLowToCoverGasBudget = (
    input: string
): { gasBalance: number; gasBudget: number; gasPrice: number } | null => {
    const pattern = /gas_balance: (\d+), gas_budget: (\d+), gas_price: (\d+)/;
    const match = pattern.exec(input);
    if (!match) {
        return null;
    }
    return {
        gasBalance: parseInt(match[1]),
        gasBudget: parseInt(match[2]),
        gasPrice: parseInt(match[3]),
    };
};

export const extractGasDataFromErrorBalanceOfGasObjectIsLowerThanGasBudget = (
    input: string
): { gasBalance: number; gasBudget: number; gasPrice: number } | null => {
    const pattern =
        /Balance of gas object (\d+) is lower than gas budget: (\d+), with gas price: (\d+)/;
    const match = pattern.exec(input);
    if (!match) {
        return null;
    }
    return {
        gasBalance: parseInt(match[1]),
        gasBudget: parseInt(match[2]),
        gasPrice: parseInt(match[3]),
    };
};

export const extractGasDataFromErrorUnableToFindCoinToCoverGas = (
    input: string
): { gasBudget: number } | null => {
    const pattern = /gas budget (\d+)/;
    const match = pattern.exec(input);
    if (!match) {
        return null;
    }
    return {
        gasBudget: parseInt(match[1]),
    };
};

export const extractGasDataFromErrorCannotFindGasCoinForSigner = (
    input: string
): { gasBudget: number } | null => {
    const pattern = /for the required gas amount\s*\[(\d+)\]/;
    const match = pattern.exec(input);
    if (!match) {
        return null;
    }
    return {
        gasBudget: parseInt(match[1]),
    };
};
