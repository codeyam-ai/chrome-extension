import { useCallback, useEffect, useState } from 'react';

import Button from '../../../../../shared/buttons/Button';
import { secureApiCall } from '_src/shared/utils/simpleApiCall';
import { useAppSelector } from '_src/ui/app/hooks';
import Alert from '_src/ui/app/shared/feedback/Alert';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { ChangeEventHandler } from 'react';

export default function ViewSeedPage() {
    const [hasConfirmed, setHasConfirmed] = useState(false);
    const [showSeed, setShowSeed] = useState(false);
    const [hostedSeed, setHostedSeed] = useState('Loading...');
    const [providedPassword, setProvidedPassword] = useState('');
    const [passphraseError, setPassphraseError] = useState(false);
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

    const matchPassword = useCallback(() => {
        const matches = providedPassword === passphrase;
        setPassphraseError(!matches);
        setShowSeed(matches);
    }, [passphrase, providedPassword]);

    const onChangeProvidedPassword = useCallback<
        ChangeEventHandler<HTMLInputElement>
    >((event) => {
        setProvidedPassword(event.target.value);
    }, []);

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
                <textarea
                    rows={4}
                    value={mnemonic || hostedSeed || ''}
                    id="mnemonic"
                    className="max-w-sm mx-auto text-center shadow-sm block w-full resize-none text-sm rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 dark:border-gray-500 dark:bg-gray-700"
                    name="mnemonic"
                    disabled={true}
                />
                <Button to="/" buttonStyle="secondary">
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
                                id="save-phrase-check"
                                aria-describedby="save-phrase-check-description"
                                name="save-phrase-check"
                                type="checkbox"
                                onChange={onHandleConfirmed}
                                checked={hasConfirmed}
                                className="h-4 w-4 rounded text-purple-600 border-gray-300 focus:ring-purple-500 dark:text-violet-700 dark:focus:ring-violet-700 dark:border-gray-400 dark:bg-gray-700"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label
                                htmlFor="save-phrase-check"
                                className="font-medium text-gray-700 dark:text-gray-400"
                                id="save-phrase-check-description"
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
                    View recovery phrase
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
            <div className="pb-4 px-6 w-full relative flex items-start text-left">
                <div className="flex flex-col gap-3 items-stretch w-full">
                    <BodyLarge>Please enter your password:</BodyLarge>
                    {passphraseError && (
                        <div className="text-ethos-dark-red">
                            Password is not correct.
                        </div>
                    )}
                    <input
                        id="view-phrase-password"
                        aria-describedby="view-phrase-password-description"
                        name="view-phrase-password"
                        type="password"
                        onChange={onChangeProvidedPassword}
                        className="rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-violet-700 dark:border-gray-400 dark:bg-gray-700"
                    />
                </div>
            </div>
            <Button
                buttonStyle="secondary"
                onClick={matchPassword}
                disabled={providedPassword.length === 0}
            >
                View recovery phrase
            </Button>
        </>
    );
}
