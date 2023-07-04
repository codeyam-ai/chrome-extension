import { useCallback } from 'react';

import getCustomizations from '_src/shared/utils/customizationsSync/getCustomizations';
import getJwt from '_src/shared/utils/customizationsSync/getJwt';
import saveCustomizations from '_src/shared/utils/customizationsSync/saveCustomizations';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';

const TestServerCustomizations: React.FC = () => {
    const { connectToLedger } = useSuiLedgerClient();
    const {
        activeAccountIndex,
        accountInfos,
        address: activeAddress,
        authentication,
        passphrase,
    } = useAppSelector(({ account }) => account);

    const handleGetCustomization = useCallback(async () => {
        const jwt = await getJwt(
            connectToLedger,
            passphrase || '',
            authentication,
            activeAddress || '',
            accountInfos,
            activeAccountIndex
        );
        const customizations = await getCustomizations(jwt);
        console.log('customizations :>> ', customizations);
    }, [
        connectToLedger,
        passphrase,
        authentication,
        activeAddress,
        accountInfos,
        activeAccountIndex,
    ]);

    const handleSaveCustomization = useCallback(async () => {
        const jwt = await getJwt(
            connectToLedger,
            passphrase || '',
            authentication,
            activeAddress || '',
            accountInfos,
            activeAccountIndex
        );
        const res = await saveCustomizations(
            jwt,
            accountInfos[activeAccountIndex]
        );
        console.log('res :>> ', res);
    }, [
        connectToLedger,
        passphrase,
        authentication,
        activeAddress,
        accountInfos,
        activeAccountIndex,
    ]);

    return (
        <div>
            <h1>Test Server Customizations</h1>
            <Button onClick={handleGetCustomization}>Get Customization</Button>
            <Button onClick={handleSaveCustomization}>
                Save Customization
            </Button>
        </div>
    );
};

export default TestServerCustomizations;
