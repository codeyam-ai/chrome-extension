import { fromB64 } from '@mysten/bcs';
import getJwt from '_src/shared/utils/customizationsSync/getJwt';
import signMessageOnUsersBehalf from '_src/shared/utils/customizationsSync/signMessageOnUsersBehalf';
import {
    authApiCall,
    explorerApiCall,
    simpleApiCall,
} from '_src/shared/utils/simpleApiCall';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import { useCallback } from 'react';

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

        const res = await explorerApiCall({
            relativePath: 'v1/user/profile',
            method: 'GET',
            accessToken: jwt,
        });

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
