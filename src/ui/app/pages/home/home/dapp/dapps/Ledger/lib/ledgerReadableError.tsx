const ledgerReadableError = (error?: string) => {
    if (!error) return;

    if (
        error ===
        "Error: The user doesn't have a Ledger device connected to their machine"
    ) {
        return {
            title: 'Not Connected',
            message:
                'Please connect your ledger to your computer, enter your passcode, and launch the Sui app.',
        };
    } else if (
        error ===
        'TransportStatusError: Ledger device: INS_NOT_SUPPORTED (0x6d00)'
    ) {
        return {
            title: 'Ledger Error',
            message:
                'The connection with Ledger does not yet support your device. It is in active development and should improve soon.',
        };
    }
};

export default ledgerReadableError;
