import { useCallback } from 'react';

import getCustomizations from '_src/shared/utils/customizationsSync/getCustomizations';
import saveCustomizations from '_src/shared/utils/customizationsSync/saveCustomizations';
import useJwt from '_src/shared/utils/customizationsSync/useJwt';
import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';

const TestServerCustomizations: React.FC = () => {
    const { activeAccountIndex, accountInfos } = useAppSelector(
        ({ account }) => account
    );
    const { getCachedJwt } = useJwt();

    const handleGetCustomization = useCallback(async () => {
        const jwt = await getCachedJwt();
        console.log('jwt :>> ', jwt);
        const customizations = await getCustomizations(jwt);
        console.log('customizations :>> ', customizations);
    }, [getCachedJwt]);

    const handleSaveCustomization = useCallback(async () => {
        const jwt = await getCachedJwt();
        const res = await saveCustomizations(
            jwt,
            accountInfos[activeAccountIndex]
        );
        console.log('res :>> ', res);
    }, [getCachedJwt, accountInfos, activeAccountIndex]);

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
