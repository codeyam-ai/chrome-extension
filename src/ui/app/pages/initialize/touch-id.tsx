import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import SimpleToggle from '../../components/SimpleToggle';
import { useBiometricAuth } from '../../hooks/useBiometricAuth';
import { createMnemonic } from '../../redux/slices/account';
import Button from '../../shared/buttons/Button';
import OnboardingCard from '../../shared/layouts/OnboardingCard';
import Body from '../../shared/typography/Body';
import BodyLarge from '../../shared/typography/BodyLarge';
import EthosLink from '../../shared/typography/EthosLink';
import { LinkType } from '_src/enums/LinkType';
import { BIOMETRIC_DISCLAIMER } from '_src/shared/constants';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';

const TouchIdOnboardingPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isBiometricsSetUp, setup, reset } = useBiometricAuth();
    const mnemonic = useAppSelector(
        ({ account }) => account.createdMnemonic || account.mnemonic
    );

    const onContinue = useCallback(async () => {
        if (mnemonic) {
            // User is importing existing seed
            navigate('/initialize/complete');
        } else {
            // User is generating new wallet
            await dispatch(createMnemonic({}));
            navigate('/initialize/save-phrase');
        }
    }, [dispatch, mnemonic, navigate]);

    return (
        <OnboardingCard
            title="Set Up Touch ID"
            subtitle="Use biometrics (Touch ID) to securely sign in
            without typing in your password."
            accentColor="green"
            icon="fingerprint"
            // Same progress indicators as CreatePasswordPage
            progressCompleted={mnemonic ? 3 : 1}
            progressTotal={mnemonic ? 3 : 5}
        >
            <div className="px-6 sm:px-10 pb-12">
                <div className="flex justify-between">
                    <BodyLarge forceLightMode>Unlock with Touch ID</BodyLarge>
                    <SimpleToggle
                        value={isBiometricsSetUp}
                        onSwitchOn={setup}
                        onSwitchOff={reset}
                        ariaLabelOn="Touch ID is enabled"
                        ariaLabelOff="Touch ID is disabled"
                        forceLightTheme
                    />
                </div>
                <Body
                    isTextColorMedium
                    className="text-left pt-2"
                    forceLightMode
                >
                    {BIOMETRIC_DISCLAIMER}
                </Body>

                <div className="flex flex-col place-content-center pt-6">
                    <Button
                        onClick={onContinue}
                        disabled={!isBiometricsSetUp}
                        removeContainerPadding
                    >
                        Continue
                    </Button>
                    {!isBiometricsSetUp && (
                        <BodyLarge className="text-center pt-4">
                            <EthosLink
                                className="!text-ethos-light-text-medium "
                                type={LinkType.Internal}
                                onClick={onContinue}
                            >
                                Skip
                            </EthosLink>
                        </BodyLarge>
                    )}
                </div>
            </div>
        </OnboardingCard>
    );
};

export default TouchIdOnboardingPage;
