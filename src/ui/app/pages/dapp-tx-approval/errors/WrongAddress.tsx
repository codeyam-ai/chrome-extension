import AlertWithErrorExpand from '_src/ui/app/shared/feedback/AlertWithErrorExpand';
import Body from '_src/ui/app/shared/typography/Body';

import type { TransactionRequest } from '_shared/messaging/messages/payloads/transactions/TransactionRequest';

type WrongAddressProps = {
    errorMessage: string;
    txID?: string;
    txRequest: TransactionRequest | null;
};

const WrongAddress = ({ errorMessage, txID, txRequest }: WrongAddressProps) => {
    return (
        <AlertWithErrorExpand
            title="Wrong Signing Address"
            body={
                <Body>
                    It looks like you are trying to sign this transaction with
                    the wrong wallet address.
                </Body>
            }
            fullErrorText={errorMessage}
            txInfo={{
                dAppUrl: txRequest?.origin || '',
                txId: txID || '',
                txRequest,
            }}
        />
    );
};

export default WrongAddress;
