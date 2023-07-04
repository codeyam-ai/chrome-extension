import { useCallback } from 'react';

import { explorerApiCall } from '_src/shared/utils/customizationsSync/ethosPlatformApiCall';
import getJwt from '_src/shared/utils/customizationsSync/getJwt';
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

    const uploadCustomization = useCallback(async () => {
        const jwt = await getJwt(
            connectToLedger,
            passphrase || '',
            authentication,
            activeAddress || '',
            accountInfos,
            activeAccountIndex
        );

        console.log('jwt :>> ', jwt);

        const res = await explorerApiCall('v1/user/profile', 'GET', jwt);

        console.log('res :>> ', res);
    }, [
        accountInfos,
        activeAccountIndex,
        activeAddress,
        authentication,
        connectToLedger,
        passphrase,
    ]);

    return (
        <div>
            <h1>Test Server Customizations</h1>
            <Button onClick={uploadCustomization}>Upload Customization</Button>
        </div>
    );
};

export default TestServerCustomizations;
