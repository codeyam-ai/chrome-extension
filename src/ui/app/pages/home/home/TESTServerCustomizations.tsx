import { fromB64 } from '@mysten/bcs';
import signMessageOnUsersBehalf from '_src/shared/utils/signMessageOnUsersBehalf';
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
        const dataToSign = {
            tenantId: '92dd81a5-dd8b-480c-b468-66f69a74c1bc',
            timestamp: Date.now(),
        };

        // const dataToSignBase64 = fromB64(JSON.stringify(dataToSign));
        const dataToSignBase64 = Buffer.from(
            JSON.stringify(dataToSign)
        ).toString('base64');

        const txResult = await signMessageOnUsersBehalf(
            connectToLedger,
            dataToSignBase64,
            passphrase,
            authentication,
            activeAddress,
            accountInfos,
            activeAccountIndex
        );

        const authReqBody: Record<string, string> = {
            b64Message: dataToSignBase64,
            b64Signature: txResult?.signature ?? '',
        };

        const res = await authApiCall({
            relativePath: 'v1/auth/sui/signature',
            method: 'POST',
            accessToken: '',
            body: authReqBody,
        });

        const { jwt } = res.json;

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
