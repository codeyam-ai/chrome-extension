import { useCallback, useEffect, useState } from 'react';

import { saveAllCustomizationsFromSeed } from '_src/shared/utils/customizationsSync/saveAllCustomizationsFromSeed';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import {
    loadCustomizationsSyncPreference,
    saveCustomizationsSyncPreference,
} from '_src/ui/app/redux/slices/account';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Toggle from '_src/ui/app/shared/inputs/Toggle';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Header from '_src/ui/app/shared/typography/Header';
import { toast } from 'react-toastify';
import { SuccessAlert } from '_src/ui/app/shared/alerts/SuccessAlert';

const PersonalizationSync: React.FC = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [loadingText, setLoadingText] = useState<string>();
    const dispatch = useAppDispatch();
    const { accountInfos, mnemonic } = useAppSelector(({ account }) => account);
    const provider = api.instance.fullNode;

    const handleToggle = useCallback(
        async (value: boolean) => {
            setIsEnabled(value);
            await dispatch(saveCustomizationsSyncPreference(value));
            if (value) {
                setLoadingText('Syncing personalization');
                await saveAllCustomizationsFromSeed(
                    mnemonic ?? '',
                    accountInfos,
                    provider
                );
                toast(<SuccessAlert text={'Personalization synced'} />);
            } else {
                setLoadingText('Deleting synced data from server');
                toast(<SuccessAlert text={'Synced data removed'} />);
            }
            setLoadingText(undefined);
        },
        [accountInfos, dispatch, mnemonic, provider]
    );

    useEffect(() => {
        const getCustomizationSyncPreference = async () => {
            const { payload: preference } = await dispatch(
                loadCustomizationsSyncPreference()
            );
            setIsEnabled(preference as boolean);
        };
        getCustomizationSyncPreference();
    }, [dispatch]);

    return (
        <div className="p-6 flex flex-col gap-6">
            <Header className="text-left">Personalization Sync</Header>

            <BodyLarge isTextColorMedium className="text-left">
                Choose if you want your wallets&apos; personalizations such as
                nickname, color, and profile picture to be synced across your
                devices.
            </BodyLarge>

            <BodyLarge isTextColorMedium className="text-left">
                This data is fully encrypted on Ethos servers and can only be
                decrypted with your private key.
            </BodyLarge>

            <div className="flex flex-row justify-between items-center">
                <BodyLarge className="text-left">
                    Sync Personalization
                </BodyLarge>
                <Toggle isChecked={isEnabled} onToggle={handleToggle} />
            </div>

            {loadingText && <Body>{loadingText}</Body>}
        </div>
    );
};

export default PersonalizationSync;
