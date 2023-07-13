import { useCallback, useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { deleteAllCustomizationsFromSeed } from '_src/shared/utils/customizationsSync/deleteAllCustomizationsFromSeed';
import { saveAllCustomizationsFromSeed } from '_src/shared/utils/customizationsSync/saveAllCustomizationsFromSeed';
import { useTheme } from '_src/shared/utils/themeContext';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import {
    loadCustomizationsSyncPreference,
    saveCustomizationsSyncPreference,
} from '_src/ui/app/redux/slices/account';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import { SuccessAlert } from '_src/ui/app/shared/alerts/SuccessAlert';
import Toggle from '_src/ui/app/shared/inputs/Toggle';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Header from '_src/ui/app/shared/typography/Header';
import SyncCustomizationsToggle from '_src/shared/utils/customizationsSync/SyncCustomizationsToggle';

const PersonalizationSync: React.FC = () => {
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

            <SyncCustomizationsToggle />
        </div>
    );
};

export default PersonalizationSync;
