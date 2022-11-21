import {
    ArrowLeftOnRectangleIcon,
    ArrowsPointingOutIcon,
    ArrowTopRightOnSquareIcon,
    CheckBadgeIcon,
    CodeBracketIcon,
    CubeIcon,
    DocumentTextIcon,
    EyeIcon,
    LockClosedIcon,
    SquaresPlusIcon,
} from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';
import Browser from 'webextension-polyfill';

import { API_ENV_TO_INFO } from '../../ApiProvider';
import { iframe } from '../../helpers';
import { useNextMenuUrl } from '_components/menu/hooks';
import { LinkType } from '_src/enums/LinkType';
import { DASHBOARD_LINK, IFRAME_URL, ToS_LINK } from '_src/shared/constants';
import { getEncrypted } from '_src/shared/storagex/store';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { getEmail, logout, reset } from '_src/ui/app/redux/slices/account';
import LinkList, {
    type LinkItem,
} from '_src/ui/app/shared/navigation/nav-bar/LinkList';

const SettingsList = () => {
    const dispatch = useAppDispatch();
    const connectedAppsUrl = useNextMenuUrl(true, '/connected-apps');
    const preapprovalsUrl = useNextMenuUrl(true, '/preapprovals');

    const networkUrl = useNextMenuUrl(true, '/network');
    const viewSeedUrl = useNextMenuUrl(true, '/settings/view-seed');
    const apiEnv = useAppSelector((state) => state.app.apiEnv);
    const networkName = API_ENV_TO_INFO[apiEnv].name;

    const [isHostedWallet, setIsHostedWallet] = useState(false);

    const handleReset = useCallback(async () => {
        const email = await dispatch(getEmail());
        if (!email) return;
        iframe.onReady(
            async () => await iframe.logOut(email.payload as string)
        );
    }, [dispatch]);

    const handleLogout = useCallback(async () => {
        await dispatch(logout());
    }, [dispatch]);

    const menuItems: LinkItem[] = [
        {
            iconWithNoClasses: <ArrowTopRightOnSquareIcon />,
            title: 'View Wallet Dashboard',
            to: DASHBOARD_LINK,
            linkType: LinkType.External,
        },
        {
            iconWithNoClasses: <ArrowsPointingOutIcon />,
            title: 'Expand view',
            to: '/tokens',
            linkType: LinkType.Internal,
            isExpandView: true,
        },
        {
            iconWithNoClasses: <SquaresPlusIcon />,
            title: 'Connected apps',
            to: connectedAppsUrl,
            linkType: LinkType.Internal,
        },
        {
            iconWithNoClasses: <CheckBadgeIcon />,
            title: 'Pre-approvals',
            to: preapprovalsUrl,
            linkType: LinkType.Internal,
        },
        {
            iconWithNoClasses: <LockClosedIcon />,
            title: 'Lock',
            linkType: LinkType.None,
            onClick: handleLogout,
        },
        {
            iconWithNoClasses: <DocumentTextIcon />,
            title: 'Terms of Service',
            to: ToS_LINK,
            linkType: LinkType.External,
        },
        {
            iconWithNoClasses: <CubeIcon />,
            title: 'Network',
            subtitle: networkName,
            to: networkUrl,
            linkType: LinkType.Internal,
        },
        {
            iconWithNoClasses: <CodeBracketIcon />,
            title: 'Wallet version',
            subtitle: 'v' + Browser.runtime.getManifest().version,
            linkType: LinkType.None,
        },
        {
            iconWithNoClasses: <ArrowLeftOnRectangleIcon />,
            title: 'Reset',
            linkType: LinkType.None,
            onClick: handleReset,
        },
    ];

    // Email users cannot view their seed
    if (!isHostedWallet) {
        menuItems.splice(5, 0, {
            iconWithNoClasses: <EyeIcon />,
            title: 'View recovery phrase',
            to: viewSeedUrl,
            linkType: LinkType.Internal,
        });
    }

    useEffect(() => {
        const listenForLogOut = async () => {
            await iframe.listenForLogout();
            await dispatch(reset());
        };
        listenForLogOut();
    }, [dispatch]);

    useEffect(() => {
        const _setIsHosted = async () => {
            const authentication = await getEncrypted('authentication');
            setIsHostedWallet(authentication !== null);
        };
        _setIsHosted();
    }, []);

    useEffect(() => {
        iframe.listenForReady();
    }, [dispatch]);

    return (
        <div className="px-6 pb-6">
            <LinkList linkItems={menuItems} />
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
};

export default SettingsList;
