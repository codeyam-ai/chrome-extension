import { useCallback, useState } from 'react';

import Button, { ButtonStyle } from '../../../shared/Button';
import { useNextMenuUrl } from '../hooks';
import Layout from './layout';
import { useAppSelector } from '_src/ui/app/hooks';

import type { ChangeEventHandler } from 'react';

export default function ViewSeed() {
    const settingsUrl = useNextMenuUrl(true, '/settings');
    const [hasConfirmed, setHasConfirmed] = useState(false);
    const [showSeed, setShowSeed] = useState(false);
    const onHandleConfirmed = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            const checked = event.target.checked;
            setHasConfirmed(checked);
        },
        []
    );
    const mnemonic = useAppSelector(
        ({ account }) => account.createdMnemonic || account.mnemonic
    );
    const viewSeed = useCallback(async () => {
        setShowSeed(true);
    }, []);

    return (
        <Layout backUrl={settingsUrl} title="Recovery Phrase">
            {showSeed ? (
                <>
                    <textarea
                        rows={2}
                        value={mnemonic || ''}
                        id="mnemonic"
                        className="mt-8 max-w-sm mx-auto text-center shadow-sm block w-full resize-none text-sm rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 dark:border-gray-500 dark:bg-gray-700"
                        name="mnemonic"
                        disabled={true}
                    />
                </>
            ) : (
                <>
                    <div className="rounded-md p-4 bg-yellow-50 dark:bg-gray-700 dark:border-yellow-400 dark:border-[1px]">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-5 w-5 text-yellow-400 dark:text-yellow-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                                    Be careful!
                                </h3>
                                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                    <p>
                                        Do <strong>not</strong> share your
                                        recovery phrase! Anyone with it has full
                                        control over your wallet.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-4 w-full relative flex items-start text-left">
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
                        buttonStyle={ButtonStyle.SECONDARY}
                        onClick={viewSeed}
                        disabled={!hasConfirmed}
                    >
                        View recovery phrase
                    </Button>
                </>
            )}
        </Layout>
    );
}
