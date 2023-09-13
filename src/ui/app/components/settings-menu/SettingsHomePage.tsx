import {
    ArrowPathIcon,
    ArrowsPointingOutIcon,
    DocumentCheckIcon,
    DocumentTextIcon,
    GlobeAltIcon,
    LockClosedIcon,
    ShieldExclamationIcon,
    SignalIcon,
} from '@heroicons/react/24/solid';
import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Browser from 'webextension-polyfill';

import { API_ENV_TO_INFO } from '../../ApiProvider';
import SettingsList from '../../shared/navigation/nav-bar/SettingsList';
import PaintBrushIcon from '../../shared/svg/PaintBrushIcon';
import BodyLarge from '../../shared/typography/BodyLarge';
import EthosLogoWithText from '../logos/EthosLogoWithText';
import {
    BASE_URL,
    DASHBOARD_LINK,
    MAILTO_SUPPORT_URL,
    ToS_LINK,
} from '_src/shared/constants';
import { ThemeContext } from '_src/shared/utils/themeContext';
import { useAppSelector } from '_src/ui/app/hooks';

export const SubpageUrls = {
    network: '/settings/network',
    theme: '/settings/theme',
    security: '/settings/security/home',
    password: '/settings/security/change-password',
    seed: '/settings/security/view-seed',
    key: '/settings/security/view-private-key',
    customizationSync: '/settings/customization-sync',
    permissions: '/settings/permissions',
    lock: '/settings/lock',
    changeAutoLockTimeout: '/settings/change-auto-lock-timeout',
};

const SettingsHomePage = () => {
    const teal = '#31BCC5';
    const purple = '#9040F5';
    const blue = '#6772FF';

    const { theme } = useContext(ThemeContext);
    const themeDisplay = useMemo(() => {
        return theme.charAt(0).toUpperCase() + theme.slice(1);
    }, [theme]);

    const apiEnv = useAppSelector((state) => state.app.apiEnv);
    const networkName = API_ENV_TO_INFO[apiEnv].name;

    return (
        <div>
            <div className="h-[550px] flex flex-col justify-between">
                <SettingsList
                    listSections={[
                        {
                            color: teal,
                            items: [
                                {
                                    text: 'View Explorer',
                                    iconWithNoClasses: <GlobeAltIcon />,
                                    to: DASHBOARD_LINK,
                                    isExternalLink: true,
                                },
                                {
                                    text: 'Open Expanded View',
                                    iconWithNoClasses: (
                                        <ArrowsPointingOutIcon />
                                    ),
                                    to: '/home',
                                    isExpandView: true,
                                },
                            ],
                        },
                        {
                            color: purple,
                            items: [
                                {
                                    text: 'Network',
                                    iconWithNoClasses: <SignalIcon />,
                                    to: SubpageUrls.network,
                                    detailText: networkName,
                                },
                                {
                                    text: 'Theme',
                                    iconWithNoClasses: <PaintBrushIcon />,
                                    to: SubpageUrls.theme,
                                    detailText: themeDisplay,
                                },
                                {
                                    text: 'Security',
                                    iconWithNoClasses: (
                                        <ShieldExclamationIcon />
                                    ),
                                    to: SubpageUrls.security,
                                },
                                {
                                    text: 'Permissions',
                                    iconWithNoClasses: <DocumentCheckIcon />,
                                    to: SubpageUrls.permissions,
                                },
                                {
                                    text: 'Lock / Reset Ethos',
                                    iconWithNoClasses: <LockClosedIcon />,
                                    to: SubpageUrls.lock,
                                },
                                {
                                    text: 'Customizations Sync',
                                    iconWithNoClasses: <ArrowPathIcon />,
                                    to: SubpageUrls.customizationSync,
                                },
                            ],
                        },
                        {
                            color: blue,
                            items: [
                                {
                                    text: 'Terms of Service',
                                    iconWithNoClasses: <DocumentTextIcon />,
                                    to: ToS_LINK,
                                    isExternalLink: true,
                                },
                                {
                                    text: 'Contact Ethos Support',
                                    iconWithNoClasses: <DocumentTextIcon />,
                                    to: MAILTO_SUPPORT_URL,
                                    isExternalLink: true,
                                },
                            ],
                        },
                    ]}
                />
                <div className="flex justify-between items-center pr-6 pl-2 py-4 border-t border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
                    <Link to={BASE_URL} target="_blank">
                        <EthosLogoWithText className="h-8" />
                    </Link>
                    <BodyLarge isTextColorMedium>
                        {'v' + Browser.runtime.getManifest().version}
                    </BodyLarge>
                </div>
            </div>
        </div>
    );
};

export default SettingsHomePage;
