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

    const sign = useCallback(async () => {
        const jwt = await getJwt(
            connectToLedger,
            passphrase || '',
            authentication,
            activeAddress || '',
            accountInfos,
            activeAccountIndex
        );

        console.log('jwt :>> ', jwt);
    }, [
        accountInfos,
        activeAccountIndex,
        activeAddress,
        authentication,
        connectToLedger,
        passphrase,
    ]);

    const testSimple = useCallback(async () => {
        // const res = await explorerApiCall({
        //     relativePath: 'v1/user/profile',
        //     method: 'GET',
        //     accessToken: '',
        // });
        const res = await authApiCall({
            relativePath: 'v1/swagger',
            method: 'GET',
            accessToken: '',
        });
        console.log('res :>> ', res);
    }, []);

    return (
        <div>
            <h1>Test Server Customizations</h1>
            <Button onClick={sign}>Sign</Button>
            <Button onClick={testSimple}>Auth API Call</Button>
        </div>
    );
};

export default TestServerCustomizations;
