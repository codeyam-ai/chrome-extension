import {
    authApiCall,
    explorerApiCall,
    simpleApiCall,
} from '_src/shared/utils/simpleApiCall';
import Button from '_src/ui/app/shared/buttons/Button';
import { useCallback } from 'react';

const TestServerCustomizations: React.FC = () => {
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
            <Button onClick={testSimple}>Test</Button>
        </div>
    );
};

export default TestServerCustomizations;
