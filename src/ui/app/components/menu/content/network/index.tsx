// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import Layout from '_components/menu/content/layout';
import { useNextMenuUrl } from '_components/menu/hooks';
import NetworkSelector from '_components/network-selector';

function Network() {
    const settingsUrl = useNextMenuUrl(true, '/settings');
    return (
        <Layout backUrl={settingsUrl} title="Network">
            <NetworkSelector />
        </Layout>
    );
}

export default Network;
