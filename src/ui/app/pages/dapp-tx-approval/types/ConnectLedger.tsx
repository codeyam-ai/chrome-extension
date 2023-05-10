import { Ed25519PublicKey } from '@mysten/sui.js';
import {
    type Dispatch,
    type SetStateAction,
    useCallback,
    useState,
} from 'react';

import { derivationPathForLedger } from '../../home/home/dapp/dapps/Ledger/hooks/useDeriveLedgerAccounts';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';

const ConnectLedger = ({
    onConnect,
}: {
    onConnect: Dispatch<SetStateAction<boolean>>;
}) => {
    const [connected, setConnected] = useState(false);
    const { connectToLedger } = useSuiLedgerClient();
    const { accountInfos, activeAccountIndex } = useAppSelector(
        (state) => state.account
    );

    const _onConnect = useCallback(async () => {
        try {
            const activeAccount = accountInfos.find(
                (accountInfo) => accountInfo.index === activeAccountIndex
            );
            if (!activeAccount?.importedLedgerIndex) return;

            console.log(
                'activeAccount.importedLedgerIndex',
                activeAccount.importedLedgerIndex
            );
            const suiLedgerClient = await connectToLedger();
            const publicKeyResult = await suiLedgerClient.getPublicKey(
                derivationPathForLedger(activeAccount.importedLedgerIndex),
                true
            );
            const publicKey = new Ed25519PublicKey(publicKeyResult.publicKey);
            const suiAddress = publicKey.toSuiAddress();

            if (suiAddress) {
                console.log('CONNECTED', suiAddress);
                setConnected(true);
            }
        } catch (error: unknown) {
            console.log('ERROR', error);
            setConnected(false);
        }
    }, [accountInfos, activeAccountIndex, connectToLedger]);

    const _onContinue = useCallback(() => {
        onConnect(true);
    }, [onConnect]);

    return (
        <div className="flex flex-col gap-6 p-6">
            {connected ? (
                <>
                    <Body>You have successfully connected!</Body>
                    <Button buttonStyle="primary" onClick={_onContinue}>
                        Continue
                    </Button>
                </>
            ) : (
                <>
                    <Body>You need to connect your ledger!</Body>
                    <Button buttonStyle="primary" onClick={_onConnect}>
                        Connect
                    </Button>
                </>
            )}
        </div>
    );
};

export default ConnectLedger;
