import { fromB64, toB64, toHEX, fromHEX } from '@mysten/bcs';
import { useCallback, useEffect, useState } from 'react';

import { secureApiCall } from '../../../../../../../shared/utils/simpleApiCall';
import Button from '../../../../../shared/buttons/Button';
import { getKeypairFromMnemonics } from '_src/shared/cryptography/mnemonics';
import { useAppSelector } from '_src/ui/app/hooks';
import Alert from '_src/ui/app/shared/feedback/Alert';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { ChangeEventHandler } from 'react';

export default function ViewPrivateKeyPage() {
    const [hasConfirmed, setHasConfirmed] = useState(false);
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [providedPassword, setProvidedPassword] = useState('');
    const [passphraseError, setPassphraseError] = useState(false);
    const activeAccountIndex = useAppSelector(
        ({ account }) => account.activeAccountIndex
    );
    const privateKey = useAppSelector(({ account }) => {
        const mnenonic = account.createdMnemonic || account.mnemonic;
        if (!mnenonic) return;

        const keypair = getKeypairFromMnemonics(mnenonic, activeAccountIndex);
        return keypair.export().privateKey;
    });
    const [hostedPrivateKey, setHostedPrivateKey] = useState('Loading...');
    const passphrase = useAppSelector(({ account }) => account.passphrase);
    const authentication = useAppSelector(
        ({ account }) => account.authentication
    );

    useEffect(() => {
        if (!hasConfirmed) return;

        const getHostedPrivateKey = async () => {
            if (!authentication) return;

            const { json, status } = await secureApiCall(
                'users/private_key',
                'POST',
                authentication,
                { chain: 'sui', index: activeAccountIndex }
            );

            if (status !== 200) {
                throw new Error(`Error retrieving private key: ${status}`);
            }

            const { privateKey } = json;

            setHostedPrivateKey(privateKey);
        };

        getHostedPrivateKey();
    }, [activeAccountIndex, authentication, hasConfirmed, privateKey]);

    const matchPassword = useCallback(() => {
        const matches = providedPassword === passphrase;
        setPassphraseError(!matches);
        setShowPrivateKey(matches);
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

    const viewPrivateKey = useCallback(async () => {
        setShowPrivateKey(true);
    }, []);

    if (showPrivateKey) {
        return (
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <div className="text-lg">Hex</div>
                    <textarea
                        rows={3}
                        value={privateKey || toHEX(fromB64(hostedPrivateKey))}
                        id="hexPrivateKey"
                        className="max-w-sm mx-auto text-center shadow-sm block w-full resize-none text-sm rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 dark:border-gray-500 dark:bg-gray-700"
                        name="hexPrivateKey"
                        disabled={true}
                    />
                </div>
                <div>
                    <div className="text-lg">Base-64</div>
                    <textarea
                        rows={3}
                        value={
                            privateKey ? toB64(fromHEX(privateKey)) : hostedPrivateKey
                        }
                        id="hexPrivateKey"
                        className="max-w-sm mx-auto text-center shadow-sm block w-full resize-none text-sm rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 dark:border-gray-500 dark:bg-gray-700"
                        name="hexPrivateKey"
                        disabled={true}
                    />
                </div>
                <div>
                    <div className="text-lg">UInt8Array</div>
                    <textarea
                        rows={3}
                        value={
                            privateKey
                                ? privateKey.toString()
                                : fromB64(hostedPrivateKey).toString()
                        }
                        id="hexPrivateKey"
                        className="max-w-sm mx-auto text-center shadow-sm block w-full resize-none text-sm rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 dark:border-gray-500 dark:bg-gray-700"
                        name="hexPrivateKey"
                        disabled={true}
                    />
                </div>
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
                        subtitle="Do not share your private key. Anyone with it has full control over that wallet address."
                    />
                </div>
                <div className="pb-4 px-6 w-full relative flex items-center">
                    <div className="flex px-3">
                        <div className="flex items-center h-5">
                            <input
                                id="view-private-key-check"
                                aria-describedby="view-private-key-check-description"
                                name="view-private-key-check"
                                type="checkbox"
                                onChange={onHandleConfirmed}
                                checked={hasConfirmed}
                                className="h-4 w-4 rounded text-purple-600 border-gray-300 focus:ring-purple-500 dark:text-violet-700 dark:focus:ring-violet-700 dark:border-gray-400 dark:bg-gray-700"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label
                                htmlFor="view-private-key-check"
                                className="font-medium text-gray-700 dark:text-gray-400"
                                id="view-private-key-check-description"
                            >
                                I understand
                            </label>
                        </div>
                    </div>
                </div>
                <Button
                    buttonStyle="secondary"
                    onClick={viewPrivateKey}
                    disabled={!hasConfirmed}
                >
                    View private key
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
                                private key. Anyone with it has full
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
                        id="view-private-key-password"
                        data-testid="view-private-key-password"
                        aria-describedby="view-private-key-password-description"
                        name="view-private-key-password"
                        type="password"
                        onChange={onChangeProvidedPassword}
                        className="rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-violet-700 dark:border-gray-400 dark:bg-gray-700"
                        autoFocus
                    />
                </div>
            </div>
            <Button
                buttonStyle="secondary"
                onClick={matchPassword}
                disabled={providedPassword.length === 0}
            >
                View private key
            </Button>
        </>
    );
}
