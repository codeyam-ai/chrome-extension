import getErrorDisplaySuiForMist from '../lib/getErrorDisplaySuiForMist';
import AlertWithErrorExpand from '_src/ui/app/shared/feedback/AlertWithErrorExpand';
import Body from '_src/ui/app/shared/typography/Body';

import type { GasData } from '../lib/extractGasData';
import type { TransactionRequest } from '_shared/messaging/messages/payloads/transactions/TransactionRequest';

type NotEnoughGasProps = {
    gasData: GasData;
    errorMessage: string;
    txID?: string;
    txRequest: TransactionRequest | null;
};

const NotEnoughGas = ({
    gasData,
    errorMessage,
    txID,
    txRequest,
}: NotEnoughGasProps) => {
    return (
        <AlertWithErrorExpand
            title="You don't have enough SUI"
            body={
                <Body>
                    It looks like your wallet doesn&apos;t have enough SUI to
                    pay for the gas for this transaction. Gas required:{' '}
                    {getErrorDisplaySuiForMist(gasData.gasBudget)} SUI
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

export default NotEnoughGas;
