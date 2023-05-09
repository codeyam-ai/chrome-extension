import { useBiometricAuth } from '_src/ui/app/hooks/useBiometricAuth';

const TestBiometrics = () => {
    const { isSupported } = useBiometricAuth();
    console.log('isSupported :>> ', isSupported);
    return (
        <div>
            <h1>Test Biometrics</h1>
        </div>
    );
};

export default TestBiometrics;
