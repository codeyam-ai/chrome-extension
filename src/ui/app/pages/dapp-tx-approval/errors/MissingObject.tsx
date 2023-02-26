import AlertWithErrorExpand from '_src/ui/app/shared/feedback/AlertWithErrorExpand';
import Body from '_src/ui/app/shared/typography/Body';

import type { TransactionRequest } from '_shared/messaging/messages/payloads/transactions/TransactionRequest';

type MissingObjectProps = {
    selectedApiEnv: string;
    errorMessage: string;
    txID?: string;
    txRequest: TransactionRequest | null;
};

const MissingObject = ({
    selectedApiEnv,
    errorMessage,
    txID,
    txRequest,
}: MissingObjectProps) => {
    return (
        <AlertWithErrorExpand
            title="Missing Object or Contract"
            body={
                <Body>
                    An object or the contract this transaction references does
                    not exist on {selectedApiEnv}. Please ensure you are on the
                    correct network or contact the creator of this app to report
                    this error.
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

export default MissingObject;
