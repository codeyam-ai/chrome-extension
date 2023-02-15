import { toHEX } from '@mysten/bcs';
import { Base64DataBuffer } from '@mysten/sui.js';
import { useCallback, useState } from 'react';

import Button from '../../../../../shared/buttons/Button';
import { getKeypairFromMnemonics } from '_src/shared/cryptography/mnemonics';
import { useAppSelector } from '_src/ui/app/hooks';
import Alert from '_src/ui/app/shared/feedback/Alert';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { ChangeEventHandler } from 'react';

export default function ViewPrivateKeyPage() {
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [providedPassword, setProvidedPassword] = useState('');
    const [passphraseError, setPassphraseError] = useState(false);
    const privateKey = useAppSelector(({ account }) => {
        const mnenonic = account.createdMnemonic || account.mnemonic;
        if (!mnenonic) return;

        const keypair = getKeypairFromMnemonics(
            mnenonic,
            account.activeAccountIndex
        );
        return keypair.secretKey;
    });
    const passphrase = useAppSelector(({ account }) => account.passphrase);

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

    if (privateKey && showPrivateKey) {
        return (
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <div className="text-lg">Hex</div>
                    <textarea
                        rows={3}
                        value={toHEX(privateKey)}
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
                        value={new Base64DataBuffer(privateKey).toString()}
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
                        value={privateKey.toString()}
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
                View private key
            </Button>
        </>
    );
}
