import { useCallback } from 'react';

import { useAppDispatch } from '_src/ui/app/hooks';
import { changeRPCNetwork } from '_src/ui/app/redux/slices/app';
import Button from '_src/ui/app/shared/buttons/Button';
import Alert from '_src/ui/app/shared/feedback/Alert';
import Body from '_src/ui/app/shared/typography/Body';

import type { IdentifierString } from '@wallet-standard/standard';
import type { ApprovalRequest } from '_src/shared/messaging/messages/payloads/transactions';
import { API_ENV } from '_src/ui/app/ApiProvider';

type IncorrectSignerProps = {
    correctChain: IdentifierString;
    errorMessage?: string;
    txID?: string;
    txRequest?: ApprovalRequest | null;
};

const IncorrectChain = ({
    correctChain,
    errorMessage,
    txID,
    txRequest,
}: IncorrectSignerProps) => {
    const dispatch = useAppDispatch();

    const switchChain = useCallback(async () => {
        let correctNetwork;
        switch (correctChain) {
            // case 'sui:mainnet':
            //     correctNetwork = API_ENV.mainNet;
            //     break;
            case 'sui:testnet':
                correctNetwork = API_ENV.testNet;
                break;
            case 'sui:local':
                correctNetwork = API_ENV.local;
                break;
            default:
                correctNetwork = API_ENV.devNet;
        }
        await dispatch(changeRPCNetwork(correctNetwork));
    }, [dispatch, correctChain]);

    return (
        <div className="px-6 pb-6 flex flex-col gap-6 items-start justify-start">
            <Alert
                title="Wrong Network"
                subtitle={
                    <Body as="div" className="flex flex-col gap-6 py-6">
                        <div>
                            This transaction request needs should be executed on
                            the{' '}
                            {correctChain.toUpperCase().split(':').join(' ')}{' '}
                            network.
                        </div>

                        <div>Would you like to switch to this network?</div>
                        <Button
                            buttonStyle="primary"
                            onClick={switchChain}
                            removeContainerPadding={true}
                        >
                            Switch
                        </Button>
                    </Body>
                }
            />
        </div>
    );
};

export default IncorrectChain;
