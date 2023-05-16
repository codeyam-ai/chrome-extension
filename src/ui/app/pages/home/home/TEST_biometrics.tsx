import { useCallback } from 'react';

import { useBiometricAuth } from '_src/ui/app/hooks/useBiometricAuth';

const TestBiometrics = () => {
    const { isSupported, setup, authenticate } = useBiometricAuth();

    const onClickAuthenticate = useCallback(() => {
        authenticate();
    }, [authenticate]);

    return (
        <div>
            <h1>Test Biometrics</h1>
            isSupported : {isSupported ? 'true' : 'false'}
            <br />
            <button onClick={setup}>Set up</button>
            <br />
            <button onClick={onClickAuthenticate}>Authenticate</button>
        </div>
    );
};

export default TestBiometrics;
