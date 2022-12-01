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
import { useNextSettingsUrl } from '_src/ui/app/components/settings-menu/hooks';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { reset } from '_src/ui/app/redux/slices/account';
// Temporary import - bug with hero icons where it doesn't show PaintBrushIcon to be exported

const SettingsHomePage = () => {
    const orange = '#EE950F';
    const purple = '#9040F5';
    // const blue = '#328EFA';
    const green = '#01C57E';
    // const pink = '#E81CA5';

    // const [loading, setLoading] = useState(false);
    // const [createWallet, setCreateWallet] = useState<() => void>(
    //     () => () => null
    // );
    const dispatch = useAppDispatch();
    const networkUrl = useNextSettingsUrl(true, '/network');
    const themeUrl = useNextSettingsUrl(true, '/theme');
    const securityUrl = useNextSettingsUrl(true, '/security');
    const permissionsUrl = useNextSettingsUrl(true, '/permissions');
    const lockUrl = useNextSettingsUrl(true, '/lock');
    // const importWalletUrl = useNextSettingsUrl(true, '/import-wallet');
    const { theme } = useContext(ThemeContext);
    const themeDisplay = useMemo(() => {
        return theme.charAt(0).toUpperCase() + theme.slice(1);
    }, [theme]);

    const apiEnv = useAppSelector((state) => state.app.apiEnv);
    const networkName = API_ENV_TO_INFO[apiEnv].name;

    // const handleCreateWallet = useCallback(() => {
    //     createWallet();
    //     navigate('/tokens');
    // }, [createWallet, navigate]);

    // const resetWallet = useCallback(async () => {
    //     setLoading(true);
    //     // iframe.listenForLogout();
    //     const email = await dispatch(getEmail());
    //     if (email) {
    //         iframe.onReady(
    //             async () => await iframe.logOut(email.payload as string)
    //         );
    //     } else {
    //         dispatch(reset);
    //     }
    // }, [dispatch]);

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
            {/* <CreateWalletProvider setCreateWallet={setCreateWallet}> */}
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
                                to: '/tokens',
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
                                to: networkUrl,
                                detailText: networkName,
                            },
                            {
                                text: 'Theme',
                                iconWithNoClasses: <PaintBrushIcon />,
                                to: themeUrl,
                                detailText: themeDisplay,
                            },
                            {
                                text: 'Security',
                                iconWithNoClasses: <ShieldExclamationIcon />,
                                to: securityUrl,
                            },
                            {
                                text: 'Permissions',
                                iconWithNoClasses: <DocumentCheckIcon />,
                                to: permissionsUrl,
                            },
                            {
                                text: 'Lock Ethos',
                                iconWithNoClasses: <LockClosedIcon />,
                                to: lockUrl,
                            },
                        ],
                    },
                    // {
                    //     color: blue,
                    //     items: [
                    //         {
                    //             text: 'Create Wallet',
                    //             iconWithNoClasses: <PlusCircleIcon />,
                    //             onClick: handleCreateWallet,
                    //         },
                    //         {
                    //             text: 'Import Wallet',
                    //             iconWithNoClasses: (
                    //                 <ArrowDownOnSquareIcon />
                    //             ),
                    //             to: importWalletUrl,
                    //         },
                    //     ],
                    // },
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
                    // {
                    //     color: pink,
                    //     items: [
                    //         {
                    //             text: 'Reset Ethos',
                    //             iconWithNoClasses: <FireIcon />,
                    //             onClick: resetWallet,
                    //         },
                    //     ],
                    // },
                ]}
            />
            {/* </CreateWalletProvider> */}
            <iframe
                id="wallet-iframe"
                src={IFRAME_URL}
                height="1px"
                width="1px"
                title="wallet"
                // Hide the iframe pixel, as it is visible in dark mode
                className="-top-[1000px] absolute"
            />
        </div>
    );

    // const dispatch = useAppDispatch();
    // const connectedAppsUrl = useNextMenuUrl(true, '/connected-apps');
    // const preapprovalsUrl = useNextMenuUrl(true, '/preapprovals');

    // const networkUrl = useNextMenuUrl(true, '/network');
    // const viewSeedUrl = useNextMenuUrl(true, '/settings/view-seed');
    // const apiEnv = useAppSelector((state) => state.app.apiEnv);
    // const networkName = API_ENV_TO_INFO[apiEnv].name;

    // const [logoutInProgress, setLogoutInProgress] = useState(false);
    // const [isHostedWallet, setIsHostedWallet] = useState(false);

    // const handleReset = useCallback(async () => {
    //     setLogoutInProgress(true);
    //     // iframe.listenForLogout();
    //     const email = await dispatch(getEmail());
    //     if (!email) return;
    //     iframe.onReady(
    //         async () => await iframe.logOut(email.payload as string)
    //     );
    // }, [dispatch]);

    // const handleLogout = useCallback(async () => {
    //     await dispatch(logout());
    // }, [dispatch]);

    // const menuItems: LinkItem[] = [
    //     {
    //         iconWithNoClasses: <ArrowTopRightOnSquareIcon />,
    //         title: 'View Wallet Dashboard',
    //         to: DASHBOARD_LINK,
    //         linkType: LinkType.External,
    //     },
    //     {
    //         iconWithNoClasses: <ArrowsPointingOutIcon />,
    //         title: 'Expand view',
    //         to: '/tokens',
    //         linkType: LinkType.Internal,
    //         isExpandView: true,
    //     },
    //     {
    //         iconWithNoClasses: <SquaresPlusIcon />,
    //         title: 'Connected apps',
    //         to: connectedAppsUrl,
    //         linkType: LinkType.Internal,
    //     },
    //     {
    //         iconWithNoClasses: <CheckBadgeIcon />,
    //         title: 'Pre-approvals',
    //         to: preapprovalsUrl,
    //         linkType: LinkType.Internal,
    //     },
    //     {
    //         iconWithNoClasses: <LockClosedIcon />,
    //         title: 'Lock',
    //         linkType: LinkType.None,
    //         onClick: handleLogout,
    //     },
    //     {
    //         iconWithNoClasses: <DocumentTextIcon />,
    //         title: 'Terms of Service',
    //         to: ToS_LINK,
    //         linkType: LinkType.External,
    //     },
    //     {
    //         iconWithNoClasses: <CubeIcon />,
    //         title: 'Network',
    //         subtitle: networkName,
    //         to: networkUrl,
    //         linkType: LinkType.Internal,
    //     },
    //     {
    //         iconWithNoClasses: <CodeBracketIcon />,
    //         title: 'Wallet version',
    //         subtitle: 'v' + Browser.runtime.getManifest().version,
    //         linkType: LinkType.None,
    //     },
    //     {
    //         iconWithNoClasses: <ArrowLeftOnRectangleIcon />,
    //         title: 'Reset',
    //         linkType: LinkType.None,
    //         onClick: handleReset,
    //     },
    // ];

    // // Email users cannot view their seed
    // if (!isHostedWallet) {
    //     menuItems.splice(5, 0, {
    //         iconWithNoClasses: <EyeIcon />,
    //         title: 'View recovery phrase',
    //         to: viewSeedUrl,
    //         linkType: LinkType.Internal,
    //     });
    // }

    // useEffect(() => {
    //     const listenForLogOut = async () => {
    //         await iframe.listenForLogout();

    //         try {
    //             await dispatch(reset());
    //         } finally {
    //             setLogoutInProgress(false);
    //         }
    //     };
    //     listenForLogOut();
    // }, [dispatch]);

    // useEffect(() => {
    //     const _setIsHosted = async () => {
    //         const authentication = await getEncrypted('authentication');
    //         setIsHostedWallet(authentication !== null);
    //     };
    //     _setIsHosted();
    // }, []);

    // useEffect(() => {
    //     iframe.listenForReady();
    // }, [dispatch]);

    // return (
    //     <div className="px-6 pb-6">
    //         <LinkList linkItems={menuItems} />
    //         <iframe
    //             id="wallet-iframe"
    //             src={IFRAME_URL}
    //             height="1px"
    //             width="1px"
    //             title="wallet"
    //             // Hide the iframe pixel, as it is visible in dark mode
    //             className="-top-[1000px] absolute"
    //         />
    //     </div>
    // );
};

export default SettingsHomePage;
