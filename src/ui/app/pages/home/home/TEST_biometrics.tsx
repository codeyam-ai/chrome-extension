import { useBiometricAuth } from '_src/ui/app/hooks/useBiometricAuth';

const TestBiometrics = () => {
    const { isSupported, setup } = useBiometricAuth();
    return (
        <div>
            <h1>Test Biometrics</h1>
            isSupported : {isSupported ? 'true' : 'false'}
            <br />
            <button onClick={setup}>Set up</button>
        </div>
    );
};

export default TestBiometrics;
