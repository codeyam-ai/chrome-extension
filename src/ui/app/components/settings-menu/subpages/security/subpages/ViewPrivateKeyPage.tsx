import { toHEX } from '@mysten/bcs';
import { Base64DataBuffer } from '@mysten/sui.js';
import { useCallback, useState } from 'react';

import Button from '../../../../../shared/buttons/Button';
import { getKeypairFromMnemonics } from '_src/shared/cryptography/mnemonics';
import { useAppSelector } from '_src/ui/app/hooks';
import Alert from '_src/ui/app/shared/feedback/Alert';

import type { ChangeEventHandler } from 'react';

export default function ViewPrivateKeyPage() {
    const [hasConfirmed, setHasConfirmed] = useState(false);
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const onHandleConfirmed = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            const checked = event.target.checked;
            setHasConfirmed(checked);
        },
        []
    );
    const privateKey = useAppSelector(({ account }) => {
        const mnenonic = account.createdMnemonic || account.mnemonic;
        if (!mnenonic) return;

        const keypair = getKeypairFromMnemonics(
            mnenonic,
            account.activeAccountIndex
        );
        return keypair.secretKey;
    });

    const viewPrivateKey = useCallback(async () => {
        setShowPrivateKey(true);
    }, []);

    return (
        <>
            {privateKey && showPrivateKey ? (
                <div className="flex flex-col gap-6 py-6">
                    <div>
                        <div className="text-lg">Hex</div>
                        <textarea
                            rows={4}
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
                            rows={4}
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
                            rows={4}
                            value={privateKey.toString()}
                            id="hexPrivateKey"
                            className="max-w-sm mx-auto text-center shadow-sm block w-full resize-none text-sm rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 dark:border-gray-500 dark:bg-gray-700"
                            name="hexPrivateKey"
                            disabled={true}
                        />
                    </div>
                </div>
            ) : (
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
                        <div className="flex">
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
                        onClick={viewPrivateKey}
                        disabled={!hasConfirmed}
                    >
                        View private key
                    </Button>
                </>
            )}
        </>
    );
}
