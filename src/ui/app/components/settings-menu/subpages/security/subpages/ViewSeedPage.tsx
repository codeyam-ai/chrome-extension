import { useCallback, useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

import PasswordVerificationForm from './PasswordVerificationForm';
import Button from '../../../../../shared/buttons/Button';
import ethosIconWhite from '_images/ethos-icon-white.png';
import ethosIcon from '_images/ethos-icon.png';
import { useDependencies } from '_src/shared/utils/dependenciesContext';
import { secureApiCall } from '_src/shared/utils/simpleApiCall';
import { useTheme } from '_src/shared/utils/themeContext';
import { useAppSelector } from '_src/ui/app/hooks';
import RecoveryPhraseDisplay from '_src/ui/app/shared/content/RecoveryPhraseDisplay';
import Alert from '_src/ui/app/shared/feedback/Alert';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Header from '_src/ui/app/shared/typography/Header';

import type { ChangeEventHandler } from 'react';
import Subheader from '_src/ui/app/shared/typography/Subheader';

export default function ViewSeedPage() {
    const [hasConfirmed, setHasConfirmed] = useState(false);
    const [showSeed, setShowSeed] = useState(false);
    const [hostedSeed, setHostedSeed] = useState<string>();
    const { featureFlags } = useDependencies();
    const { resolvedTheme } = useTheme();
    const mnemonic = useAppSelector(
        ({ account }) => account.createdMnemonic || account.mnemonic
    );
    const { passphrase, authentication } = useAppSelector(
        ({ account }) => account
    );

    useEffect(() => {
        if (!hasConfirmed) return;

        const getHostedSeed = async () => {
            if (!authentication) return;

            const { json, status } = await secureApiCall(
                'users/recovery_phrase',
                'POST',
                authentication,
                { chain: 'sui' }
            );

            if (status !== 200) {
                throw new Error(`Error retrieving recovery phrase: ${status}`);
            }

            const { phrase } = json;
            setHostedSeed(phrase);
        };

        getHostedSeed();
    }, [authentication, hasConfirmed]);

    const onHandleConfirmed = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            const checked = event.target.checked;
            setHasConfirmed(checked);
        },
        []
    );

    const viewSeed = useCallback(async () => {
        setShowSeed(true);
    }, []);

    if (showSeed) {
        return (
            <div className="p-6 flex flex-col gap-6">
                <Header className="text-left">Your Recovery Phrase</Header>
                <RecoveryPhraseDisplay
                    mnemonic={hostedSeed ?? mnemonic ?? ''}
                />
                {featureFlags.showMobile && (
                    <div className="flex flex-col items-center">
                        <Subheader className="w-full text-left pb-2">
                            Import Wallet in Mobile App
                        </Subheader>
                        <BodyLarge className="w-full text-left pb-4">
                            Scan with your Ethos mobile app to automatically
                            import your wallet:
                        </BodyLarge>
                        <QRCode
                            // The QR Code scanner in React Native only supports URLs, so I made this a pseudo-deep link
                            value={`ethos://${encodeURIComponent(
                                hostedSeed ?? mnemonic ?? ''
                            )}`}
                            size={200}
                            quietZone={0}
                            eyeRadius={[
                                [10, 10, 0, 10], // top/left eye
                                [10, 10, 10, 0], // top/right eye
                                [10, 0, 10, 10], // bottom/left
                            ]}
                            fgColor={
                                resolvedTheme === 'light' ? '#6D28D9' : 'white'
                            }
                            bgColor={
                                resolvedTheme === 'light' ? 'white' : '#111111'
                            }
                            logoImage={
                                resolvedTheme === 'light'
                                    ? ethosIcon
                                    : ethosIconWhite
                            }
                            logoHeight={36}
                            logoWidth={30}
                            logoPadding={12}
                            logoPaddingStyle="circle"
                            removeQrCodeBehindLogo
                            qrStyle="dots"
                        />
                    </div>
                )}
                <Button to="/" buttonStyle="secondary" isInline>
                    Done
                </Button>
            </div>
        );
    }

    if (!passphrase) {
        return (
            <>
                <div className="px-6 py-6">
                    <Alert
                        title="Be careful!"
                        subtitle="Do not share your recovery phrase. Anyone with it has full control over your wallet."
                    />
                </div>
                <div className="pb-4 px-6 w-full relative flex items-center">
                    <div className="flex px-3">
                        <div className="flex items-center h-5">
                            <input
                                id="view-phrase-check"
                                aria-describedby="view-phrase-check-description"
                                name="view-phrase-check"
                                type="checkbox"
                                onChange={onHandleConfirmed}
                                checked={hasConfirmed}
                                className="h-4 w-4 rounded text-purple-600 border-gray-300 focus:ring-purple-500 dark:text-violet-700 dark:focus:ring-violet-700 dark:border-gray-400 dark:bg-gray-700"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label
                                htmlFor="view-phrase-check"
                                className="font-medium text-gray-700 dark:text-gray-400"
                                id="view-phrase-check-description"
                            >
                                I understand
                            </label>
                        </div>
                    </div>
                </div>
                <Button
                    buttonStyle="secondary"
                    onClick={viewSeed}
                    disabled={!hasConfirmed}
                >
                    View Recovery Phrase
                </Button>
            </>
        );
    }

    return (
        <>
            <div className="px-6 py-6">
                <Alert
                    title="Be careful!"
                    subtitle="Do not share your
                                recovery phrase. Anyone with it has full
                                control over your wallet."
                />
            </div>
            <PasswordVerificationForm
                onSubmit={viewSeed}
                submitButtonText="View Recovery Phrase"
            />
        </>
    );
}
