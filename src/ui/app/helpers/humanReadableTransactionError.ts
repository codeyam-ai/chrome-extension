const humanReadableTransactionErrors = (errorMessage: string) => {
    if (
        errorMessage &&
        (errorMessage.indexOf(
            "The user doesn't have a Ledger device connected to their machine"
        ) > -1 ||
            errorMessage.indexOf('Ledger device: UNKNOWN_ERROR (0x6e01)') >
                -1 ||
            errorMessage.indexOf(
                "Unable to connect to the user's Ledger device: Cannot read properties of undefined (reading 'open')"
            ) > -1)
    ) {
        return 'Please connect your ledger and open the Sui app.';
    }

    if (
        errorMessage.indexOf('Ledger device: INS_NOT_SUPPORTED (0x6d00)') > -1
    ) {
        return 'The Ledger did not sign the transaction. Please try again. Be sure to scroll all the way to the right until you see the "Confirm" button.';
    }

    return errorMessage;
};

export default humanReadableTransactionErrors;
