import { fromB64, toHEX, fromHEX, toB64 } from '@mysten/bcs';
import { useCallback, useEffect, useState } from 'react';

import PasswordVerificationForm from './PasswordVerificationForm';
import { secureApiCall } from '../../../../../../../shared/utils/simpleApiCall';
import Button from '../../../../../shared/buttons/Button';
import { getKeypairFromMnemonics } from '_src/shared/cryptography/mnemonics';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import {
    getImportedMnemonic,
    getImportedPrivateKey,
} from '_src/ui/app/redux/slices/account';
import Alert from '_src/ui/app/shared/feedback/Alert';

import type { ChangeEventHandler } from 'react';

export default function ViewPrivateKeyPage() {
    const dispatch = useAppDispatch();
    const [hasConfirmed, setHasConfirmed] = useState(false);
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const activeAccountIndex = useAppSelector(
        ({ account }) => account.activeAccountIndex
    );
    const activeAccountInfo = useAppSelector(({ account }) => {
        return account.accountInfos.find(
            (accountInfo) => accountInfo.index === activeAccountIndex
        );
    });
    const privateKey = useAppSelector(({ account }) => {
        if (activeAccountInfo?.importedMnemonicName) return;
        if (activeAccountInfo?.importedPrivateKeyName) return;

        const mnemonic = account.createdMnemonic || account.mnemonic;
        if (!mnemonic) return;

        const keypair = getKeypairFromMnemonics(mnemonic, activeAccountIndex);
        return keypair.export().privateKey;
    });
    const passphrase = useAppSelector(({ account }) => account.passphrase);
    const authentication = useAppSelector(
        ({ account }) => account.authentication
    );
    const [hostedPrivateKey, setHostedPrivateKey] = useState<
        string | undefined
    >();
    const [importedPrivateKey, setImportedPrivateKey] = useState<
        string | undefined
    >();

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

    useEffect(() => {
        if (!activeAccountInfo) return;

        const name = activeAccountInfo?.importedMnemonicName;
        if (!name) return;

        const getImportedPrivateKey = async () => {
            const mnemonic = await dispatch(
                getImportedMnemonic({ name })
            ).unwrap();

            if (!mnemonic) return;

            const keypair = getKeypairFromMnemonics(
                mnemonic,
                activeAccountInfo.importedMnemonicIndex
            );

            setImportedPrivateKey(keypair.export().privateKey);
        };

        getImportedPrivateKey();
    }, [activeAccountInfo, dispatch, privateKey]);

    useEffect(() => {
        if (!activeAccountInfo) return;

        const name = activeAccountInfo?.importedPrivateKeyName;
        if (!name) return;

        const getImported = async () => {
            const privateKey = await dispatch(
                getImportedPrivateKey({ name })
            ).unwrap();

            if (!privateKey) return;

            setImportedPrivateKey(toB64(fromHEX(privateKey)));
        };

        getImported();
    }, [activeAccountInfo, dispatch, privateKey]);

    const safePrivateKey = privateKey ?? hostedPrivateKey ?? importedPrivateKey;

    if (showPrivateKey) {
        return (
            <div className="flex flex-col gap-6 p-6">
                <div>
                    <div className="text-lg">Hex</div>
                    <div
                        id="hexPrivateKey"
                        className="break-words p-3 max-w-sm mx-auto text-center shadow-sm block w-full resize-none text-sm rounded-md border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 dark:border-gray-500 dark:bg-gray-700"
                    >
                        {!safePrivateKey
                            ? 'Loading...'
                            : toHEX(fromB64(safePrivateKey))}
                    </div>
                </div>
                <div>
                    <div className="text-lg">Base-64</div>
                    <div
                        id="b64PrivateKey"
                        className="break-words p-3 max-w-sm mx-auto text-center shadow-sm block w-full resize-none text-sm rounded-md border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 dark:border-gray-500 dark:bg-gray-700"
                    >
                        {!safePrivateKey ? 'Loading...' : safePrivateKey}
                    </div>
                </div>
                <div>
                    <div className="text-lg">UInt8Array</div>
                    <div
                        id="UInt8ArrayPrivateKey"
                        className="break-words p-3 max-w-sm mx-auto text-center shadow-sm block w-full resize-none text-sm rounded-md border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 dark:border-gray-500 dark:bg-gray-700"
                    >
                        {!safePrivateKey
                            ? 'Loading...'
                            : fromB64(safePrivateKey).toString()}
                    </div>
                </div>
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
                    View Private Key
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
            <PasswordVerificationForm
                onSubmit={viewPrivateKey}
                submitButtonText="View Private Key"
            />
        </>
    );
}
