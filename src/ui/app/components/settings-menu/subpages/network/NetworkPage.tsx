// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

import CustomRpcForm from './CustomRpcForm';
import {
    API_ENV,
    API_ENV_TO_INFO,
    generateActiveNetworkList,
} from '_src/ui/app/ApiProvider';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { changeRPCNetwork } from '_src/ui/app/redux/slices/app';
import SegmentedControl from '_src/ui/app/shared/inputs/SegmentedControl';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';

import type { SegmentedControlItem } from '_src/ui/app/shared/inputs/SegmentedControl';

function NetworkPage() {
    const [selectedApiEnv, customRPC] = useAppSelector(({ app }) => [
        app.apiEnv,
        app.customRPC,
    ]);
    const [showCustomRPCInput, setShowCustomRPCInput] = useState<boolean>(
        selectedApiEnv === API_ENV.customRPC
    );

    const [selectedNetworkName, setSelectedNetworkName] =
        useState<string>(selectedApiEnv);

    // change the selected network name whenever the selectedApiEnv changes
    useEffect(() => {
        setSelectedNetworkName(selectedApiEnv);
    }, [selectedApiEnv]);

    const dispatch = useAppDispatch();

    const networks = useMemo(() => {
        return generateActiveNetworkList().map((itm) => ({
            ...API_ENV_TO_INFO[itm as keyof typeof API_ENV],
            networkName: itm,
        }));
    }, []);

    const queryClient = useQueryClient();

    const networkOptions = useMemo(() => {
        const options: SegmentedControlItem[] = [];
        networks.forEach((network) => {
            if (network.networkName === 'local') {
                return;
            }
            const changeToThisNetwork = () => {
                const name = network.networkName;
                setShowCustomRPCInput(name === API_ENV.customRPC);
                const isEmptyCustomRpc =
                    name === API_ENV.customRPC && !customRPC;

                setSelectedNetworkName(name && !isEmptyCustomRpc ? name : '');

                if (isEmptyCustomRpc) {
                    setShowCustomRPCInput(true);
                    return;
                }
                const apiEnv = API_ENV[name as keyof typeof API_ENV];
                dispatch(changeRPCNetwork({ apiEnv, queryClient }));
            };
            const isCustomRpc = network.name === 'Custom RPC URL';
            const isCustomRpcSelected =
                selectedNetworkName === '' && isCustomRpc;
            options.push({
                text: isCustomRpc ? 'Custom' : network.name,
                isActive:
                    selectedNetworkName === network.networkName ||
                    isCustomRpcSelected,
                onClick: changeToThisNetwork,
            });
        });
        return options;
    }, [networks, selectedNetworkName, customRPC, dispatch, queryClient]);

    return (
        <div className="flex flex-col">
            <ContentBlock className="!py-6">
                <Header>Network</Header>
                <BodyLarge isTextColorMedium>
                    Mainnet is used for live transactions. Devnet and testnet
                    are only intended for developers to test their dApps and
                    tokens.
                </BodyLarge>
            </ContentBlock>
            <SegmentedControl items={networkOptions} />
            {showCustomRPCInput && <CustomRpcForm />}
        </div>
    );
}

export default NetworkPage;
