import {
    ArrowsPointingOutIcon,
    DocumentCheckIcon,
    DocumentTextIcon,
    GlobeAltIcon,
    LockClosedIcon,
    ShieldExclamationIcon,
    SignalIcon,
} from '@heroicons/react/24/solid';
import { useContext, useEffect, useMemo } from 'react';

import { API_ENV_TO_INFO } from '../../ApiProvider';
import { iframe } from '../../helpers';
import SettingsList from '../../shared/navigation/nav-bar/SettingsList';
import PaintBrushIcon from '../../shared/svg/PaintBrushIcon';
import {
    DASHBOARD_LINK,
    IFRAME_URL,
    MAILTO_SUPPORT_URL,
    ToS_LINK,
} from '_src/shared/constants';
import { ThemeContext } from '_src/shared/utils/themeContext';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { reset } from '_src/ui/app/redux/slices/account';

export const SubpageUrls = {
    network: '/settings/network',
    theme: '/settings/theme',
    security: '/settings/security/home',
    password: '/settings/security/change-password',
    seed: '/settings/security/view-seed',
    key: '/settings/security/view-private-key',
    permissions: '/settings/permissions',
    lock: '/settings/lock',
    changeAutoLockTimeout: '/settings/change-auto-lock-timeout',
};

const SettingsHomePage = () => {
    const orange = '#EE950F';
    const purple = '#9040F5';
    const green = '#01C57E';

    const dispatch = useAppDispatch();
    const { theme } = useContext(ThemeContext);
    const themeDisplay = useMemo(() => {
        return theme.charAt(0).toUpperCase() + theme.slice(1);
    }, [theme]);

    const apiEnv = useAppSelector((state) => state.app.apiEnv);
    const networkName = API_ENV_TO_INFO[apiEnv].name;

    useEffect(() => {
        const listenForLogOut = async () => {
            await iframe.listenForLogout();

            try {
                await dispatch(reset());
            } finally {
                // setLoading(false);
            }
        };
        listenForLogOut();
    }, [dispatch]);
    useEffect(() => {
        iframe.listenForReady();
    }, [dispatch]);

    return (
        <div>
            <SettingsList
                listSections={[
                    {
                        color: orange,
                        items: [
                            {
                                text: 'View Explorer',
                                iconWithNoClasses: <GlobeAltIcon />,
                                to: DASHBOARD_LINK,
                                isExternalLink: true,
                            },
                            {
                                text: 'Open Expanded View',
                                iconWithNoClasses: <ArrowsPointingOutIcon />,
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
                                iconWithNoClasses: <ShieldExclamationIcon />,
                                to: SubpageUrls.security,
                            },
                            {
                                text: 'Permissions',
                                iconWithNoClasses: <DocumentCheckIcon />,
                                to: SubpageUrls.permissions,
                            },
                            {
                                text: 'Lock Ethos',
                                iconWithNoClasses: <LockClosedIcon />,
                                to: SubpageUrls.lock,
                            },
                        ],
                    },
                    {
                        color: green,
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
            <iframe
                id="wallet-iframe"
                src={IFRAME_URL}
                height="1px"
                width="1px"
                title="wallet"
                className="-top-[1000px] absolute"
            />
        </div>
    );
};

export default SettingsHomePage;
