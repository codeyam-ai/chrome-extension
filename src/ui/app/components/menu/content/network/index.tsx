// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useNextSettingsUrl } from '_components/menu/hooks';
import NetworkSelector from '_components/network-selector';
import NavBarWithBackAndTitle from '_src/ui/app/shared/navigation/nav-bar/NavBarWithBackAndTitle';

function Network() {
    const settingsUrl = useNextSettingsUrl(true, '/settings');
    return (
        <>
            <NavBarWithBackAndTitle title="Network" backLink={settingsUrl} />
            <NetworkSelector />
        </>
    );
}

export default Network;
