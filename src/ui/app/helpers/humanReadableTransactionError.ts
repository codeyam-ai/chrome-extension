import { isErrorCausedByUserNotHavingEnoughSuiToPayForGas } from '../pages/dapp-tx-approval/lib';
import { getGasDataFromError } from '../pages/dapp-tx-approval/lib/extractGasData';
import getErrorDisplaySuiForMist from '../pages/dapp-tx-approval/lib/getErrorDisplaySuiForMist';

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
        return 'The Ledger did not sign the transaction. Please ensure blind transactions are enabled and scroll all the way to the right until you see the "Confirm" button.';
    }

    if (isErrorCausedByUserNotHavingEnoughSuiToPayForGas(errorMessage)) {
        return `You don't have enough SUI to pay the transaction cost of ${getErrorDisplaySuiForMist(
            getGasDataFromError(errorMessage)?.gasBudget
        )} SUI.`;
    }

    return errorMessage;
};

export default humanReadableTransactionErrors;
