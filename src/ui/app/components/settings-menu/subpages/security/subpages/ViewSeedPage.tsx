import { useCallback, useState } from 'react';

import Button from '../../../../../shared/buttons/Button';
import { useAppSelector } from '_src/ui/app/hooks';
import NavBarWithBackAndTitle from '_src/ui/app/shared/navigation/nav-bar/NavBarWithBackAndTitle';

import type { ChangeEventHandler } from 'react';
import { useNextSettingsUrl } from '../../../hooks';
import Alert from '_src/ui/app/shared/feedback/Alert';

export default function ViewSeedPage() {
    const menuUrl = useNextSettingsUrl(true, '/');
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
        <>
            {showSeed ? (
                <div className="p-6">
                    <textarea
                        rows={2}
                        value={mnemonic || ''}
                        id="mnemonic"
                        className="max-w-sm mx-auto text-center shadow-sm block w-full resize-none text-sm rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 dark:border-gray-500 dark:bg-gray-700"
                        name="mnemonic"
                        disabled={true}
                    />
                </div>
            ) : (
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
                        onClick={viewSeed}
                        disabled={!hasConfirmed}
                    >
                        View recovery phrase
                    </Button>
                </>
            )}
        </>
    );
}
