import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import Authentication from '_src/background/Authentication';
import { deleteAllCustomizationsFromSeed } from '_src/shared/utils/customizationsSync/deleteAllCustomizationsFromSeed';
import { getAllCustomizationsFromSeed } from '_src/shared/utils/customizationsSync/getAllCustomizationsFromSeed';
import { saveAllCustomizationsFromSeed } from '_src/shared/utils/customizationsSync/saveAllCustomizationsFromSeed';
import { useTheme } from '_src/shared/utils/themeContext';
import { type AccountInfo } from '_src/ui/app/KeypairVault';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import {
    loadCustomizationsSyncPreference,
    saveAccountInfos,
    saveCustomizationsSyncPreference,
    setAccountInfos,
} from '_src/ui/app/redux/slices/account';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import { SuccessAlert } from '_src/ui/app/shared/alerts/SuccessAlert';
import InfoDialog from '_src/ui/app/shared/dialog/InfoDialog';
import Toggle from '_src/ui/app/shared/inputs/Toggle';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

interface SyncCustomizationsToggleProps {
    showModalButton?: boolean;
}

const SyncCustomizationsToggle: React.FC<SyncCustomizationsToggleProps> = ({
    showModalButton,
}) => {
    const [isSyncEnabled, setIsSyncEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingText, setLoadingText] = useState<string>();
    const { resolvedTheme } = useTheme();
    const { accountInfos, authentication, mnemonic } = useAppSelector(
        ({ account }) => account
    );
    const provider = api.instance.fullNode;
    const dispatch = useAppDispatch();

    const handleToggleSync = useCallback(
        async (value: boolean) => {
            setIsSyncEnabled(value);
            await dispatch(saveCustomizationsSyncPreference(value));
            if (value) {
                setLoadingText('Syncing personalization');
                const customizationsFromServer =
                    await getAllCustomizationsFromSeed(
                        mnemonic ?? '',
                        provider
                    );
                if (
                    customizationsFromServer !== 'deleted' &&
                    Object.keys(customizationsFromServer).length > 0
                ) {
                    const latestAccountInfos: AccountInfo[] = Object.values(
                        customizationsFromServer
                    ) as AccountInfo[];
                    if (authentication) {
                        await Authentication.updateAccountInfos(
                            latestAccountInfos
                        );
                        await dispatch(setAccountInfos(latestAccountInfos));
                        await Authentication.getAccountInfos(true);
                    } else {
                        await dispatch(saveAccountInfos(latestAccountInfos));
                    }
                } else {
                    await saveAllCustomizationsFromSeed(
                        mnemonic ?? '',
                        accountInfos,
                        provider
                    );
                }
                toast(<SuccessAlert text={'Personalization synced'} />);
            } else {
                setLoadingText('Deleting synced data from server');
                await deleteAllCustomizationsFromSeed(
                    mnemonic ?? '',
                    accountInfos,
                    provider
                );
                toast(<SuccessAlert text={'Synced data removed'} />);
            }
            setLoadingText(undefined);
        },
        [accountInfos, authentication, dispatch, mnemonic, provider]
    );

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    useEffect(() => {
        const getCustomizationSyncPreference = async () => {
            const { payload: preference } = await dispatch(
                loadCustomizationsSyncPreference()
            );
            setIsSyncEnabled(preference as boolean);
        };
        getCustomizationSyncPreference();
    }, [dispatch]);

    return (
        <div>
            <div className="flex flex-row justify-between items-center mt-4">
                <div className="flex flex-row items-center">
                    <BodyLarge className="text-left">
                        Sync Personalization
                    </BodyLarge>
                    {showModalButton && (
                        <div className="cursor-pointer p-1" onClick={openModal}>
                            <QuestionMarkCircleIcon className="w-5 h-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                        </div>
                    )}
                </div>
                <Toggle isChecked={isSyncEnabled} onToggle={handleToggleSync} />
            </div>
            {loadingText ? (
                <div className="flex gap-4 items-center place-content-center mt-4">
                    <PuffLoader
                        color={
                            resolvedTheme === 'light' ? '#6D28D9' : '#9C78F7'
                        }
                        loading={true}
                        size={24}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <Body>{loadingText}</Body>
                </div>
            ) : (
                // Space so the content below doesn't jump
                <div className="h-[40px]" />
            )}
            <InfoDialog
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title="Personalization Sync"
                paragraphs={[
                    "Choose if you want your wallets' personalizations such as nickname, color, and profile picture to be synced across your devices.",
                    'This data is fully encrypted on Ethos servers and can only be decrypted with your private key.',
                ]}
                iconWithNoClasses={<SparklesIcon />}
            />
        </div>
    );
};

export default SyncCustomizationsToggle;
