export const isErrorCausedByUserNotHavingEnoughSui = (errorMessage: string) => {
    return (
        (errorMessage.includes('Balance of gas object') &&
            errorMessage.includes('is lower than gas budget')) ||
        (errorMessage.includes('Cannot find gas coin for signer address') &&
            errorMessage.includes('with amount sufficient for the budget'))
    );
};

export const isErrorCausedByIncorrectSigner = (errorMessage: string) => {
    return (
        errorMessage.includes('IncorrectSigner') &&
        errorMessage.includes('but signer address is')
    );
};

export const isErrorCausedByMissingObject = (errorMessage: string) => {
    return (
        errorMessage.includes(
            'Error: RPC Error: Could not find the referenced object'
        ) || errorMessage.includes('Error checking transaction input objects')
    );
};

export const isErrorObjectVersionUnavailable = (errorMessage: string) => {
    return errorMessage.includes('ObjectVersionUnavailableForConsumption');
};
