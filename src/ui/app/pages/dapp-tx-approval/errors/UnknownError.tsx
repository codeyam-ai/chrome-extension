import AlertWithErrorExpand from '_src/ui/app/shared/feedback/AlertWithErrorExpand';
import Body from '_src/ui/app/shared/typography/Body';

import type { ApprovalRequest } from '_shared/messaging/messages/payloads/transactions/ApprovalRequest';

type MissingObjectProps = {
    selectedApiEnv: string;
    errorMessage: string;
    txID?: string;
    txRequest: ApprovalRequest | null;
};

const UnknownError = ({
    selectedApiEnv,
    errorMessage,
    txID,
    txRequest,
}: MissingObjectProps) => {
    return (
        <AlertWithErrorExpand
            title="Unknown Error"
            body={<Body>An unknow error occurred.</Body>}
            fullErrorText={errorMessage}
            txInfo={{
                dAppUrl: txRequest?.origin || '',
                txId: txID || '',
                txRequest,
            }}
            isExpanded={true}
        />
    );
};

export default UnknownError;
