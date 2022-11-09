import {
    ArrowLeftOnRectangleIcon,
    CodeBracketIcon,
    CubeIcon,
    DocumentTextIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';
import { useCallback, useState, useEffect } from 'react';
import Browser from 'webextension-polyfill';

import LoadingIndicator from '../../loading/LoadingIndicator';
import { useNextMenuUrl } from '../hooks';
import { API_ENV_TO_INFO } from '_app/ApiProvider';
import { LinkType } from '_src/enums/LinkType';
import { IFRAME_URL, ToS_LINK } from '_src/shared/constants';
import { getEncrypted } from '_src/shared/storagex/store';
import { iframe } from '_src/ui/app/helpers';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { getEmail, reset } from '_src/ui/app/redux/slices/account';
import LinkList from '_src/ui/app/shared/navigation/nav-bar/LinkList';

import type { LinkItem } from '_src/ui/app/shared/navigation/nav-bar/LinkList';

export default function Settings() {
    const networkUrl = useNextMenuUrl(true, '/network');
    const viewSeedUrl = useNextMenuUrl(true, '/settings/view-seed');
    const apiEnv = useAppSelector((state) => state.app.apiEnv);
    const networkName = API_ENV_TO_INFO[apiEnv].name;

    const dispatch = useAppDispatch();
    const [logoutInProgress, setLogoutInProgress] = useState(false);
    const [isHostedWallet, setIsHostedWallet] = useState(false);

    const handleReset = useCallback(async () => {
        setLogoutInProgress(true);
        // iframe.listenForLogout();
        const email = await dispatch(getEmail());
        if (!email) return;
        iframe.onReady(
            async () => await iframe.logOut(email.payload as string)
        );
    }, [dispatch]);

    const menuItems: LinkItem[] = [
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
        menuItems.unshift({
            iconWithNoClasses: <EyeIcon />,
            title: 'View recovery phrase',
            to: viewSeedUrl,
            linkType: LinkType.Internal,
        });
    }

    useEffect(() => {
        const listenForLogOut = async () => {
            await iframe.listenForLogout();

            try {
                await dispatch(reset());
            } finally {
                setLogoutInProgress(false);
            }
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
        <>
            {logoutInProgress ? (
                <LoadingIndicator />
            ) : (
                <div className="px-6 pb-6">
                    <LinkList linkItems={menuItems} />
                </div>
            )}
            {/* <Layout backUrl={menuUrl || '/'} title="">
                <div
                    className={
                        st.container +
                        ' divide-y divide-gray-700/50 dark:divide-gray-400/50'
                    }
                >
                    {!isHostedWallet && (
                        <Link className={st.item} to={viewSeedUrl}>
                            <Item
                                svg={eyeIcon}
                                title="View recovery phrase"
                                indicator={SuiIcons.SuiChevronRight}
                            />
                        </Link>
                    )}
                    <ExternalLink
                        className={st.item}
                        href={ToS_LINK}
                        showIcon={false}
                    >
                        <Item
                            icon="file-earmark-text"
                            title="Terms of Service"
                            indicator="link-45deg"
                        />
                    </ExternalLink>
                    <Link to={networkUrl} className={st.item}>
                        <Item
                            icon={SuiIcons.Globe}
                            title="Network"
                            subtitle={networkName}
                            indicator={SuiIcons.SuiChevronRight}
                        />
                    </Link>
                    <div className={st.item}>
                        <Item
                            // TODO: import and use the icon from Figma
                            icon={SuiIcons.VersionIcon}
                            title="Wallet version"
                            subtitle={'v' + version}
                        />
                    </div>
                    <span onClick={handleReset} className={st.item}>
                        {logoutInProgress ? (
                            <LoadingIndicator />
                        ) : (
                            <Item icon={SuiIcons.Logout} title="Reset" />
                        )}
                    </span>
                </div>
            </Layout> */}
            <iframe
                id="wallet-iframe"
                src={IFRAME_URL}
                height="1px"
                width="1px"
                title="wallet"
                // Hide the iframe pixel, as it is visible in dark mode
                className="-top-[1000px] absolute"
            />
        </>
    );
}
