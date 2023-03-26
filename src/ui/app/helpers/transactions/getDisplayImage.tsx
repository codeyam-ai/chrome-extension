import { FormattedTransaction } from '../../types/transactions/FormattedTransaction';

export type TxType = string;

const getDisplayImage = (txn: FormattedTransaction): string | null => {
    // Iterate through the inputs for a transaction and check if
    // each value in the input is a url and that url contains in image
    // if so return the url, if not return null

    // If there's no image val is falsy
    let response = null;

    if ('commands' in txn.transaction.data.transaction) {
        // input arguments for the movecall transaction
        const inputs = txn.transaction.data.transaction.inputs;

        // iterate through the commands to check if it's a mint func
        txn.transaction.data.transaction.commands.forEach((command) => {
            const commandObj = command as any;
            const commandKey = Object.keys(commandObj)[0];

            // Check if the function has an input
            // with a url value that contains an image
            // Load the image to see if it's valid
            if (commandKey === 'MoveCall') {
                inputs.forEach((input) => {
                    if ('value' in input) {
                        const val = input.value;

                        if (typeof val === 'string' && val.includes('http')) {
                            response = val;
                            const img = new Image();
                            img.src = val;

                            img.onload = () => {
                                response = val;
                            };
                        }
                    }
                });
            }
        });
    }

    return response;
};

export default getDisplayImage;
