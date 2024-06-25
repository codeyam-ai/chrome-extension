// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useQueryClient } from '@tanstack/react-query';
import cl from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo, useCallback } from 'react';

import { CustomRPCInput } from './custom-rpc-input';
import {
    API_ENV_TO_INFO,
    API_ENV,
    generateActiveNetworkList,
} from '_app/ApiProvider';
import Icon from '_components/icon';
import { useAppSelector, useAppDispatch } from '_hooks';
import { changeRPCNetwork } from '_redux/slices/app';

import st from './NetworkSelector.module.scss';

const NetworkSelector = () => {
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

    const netWorks = useMemo(() => {
        return generateActiveNetworkList()
            .map((itm) => ({
                ...API_ENV_TO_INFO[itm as keyof typeof API_ENV],
                networkName: itm,
            }))
            .filter((itm) => itm.name !== 'Devnet'); // Shinami discontinued devnet;
    }, []);

    const queryClient = useQueryClient();

    const changeNetwork = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            const networkName = e.currentTarget.dataset.network;
            setShowCustomRPCInput(networkName === API_ENV.customRPC);
            const isEmptyCustomRpc =
                networkName === API_ENV.customRPC && !customRPC;

            setSelectedNetworkName(
                networkName && !isEmptyCustomRpc ? networkName : ''
            );

            if (isEmptyCustomRpc) {
                setShowCustomRPCInput(true);
                return;
            }
            const apiEnv = API_ENV[networkName as keyof typeof API_ENV];
            dispatch(changeRPCNetwork({ apiEnv, queryClient }));
        },
        [customRPC, dispatch, queryClient]
    );

    return (
        <div className="flex flex-col items-center content-center px-6">
            <ul className="w-full grid grid-cols-1 gap-2">
                {netWorks.map((apiEnv) => (
                    <li
                        key={apiEnv.networkName}
                        data-network={apiEnv.networkName}
                        onClick={changeNetwork}
                        className="col-span-1 flex rounded-md shadow-sm"
                    >
                        <button
                            className={
                                'flex flex-col flex-1 relative truncate items-center text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 dark:border-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 shadow-sm'
                            }
                        >
                            <div className="w-full flex justify-between items-center">
                                {apiEnv.name}
                                <Icon
                                    icon="check2"
                                    className={cl(
                                        st.networkIcon,
                                        st.selectedNetwork,
                                        selectedNetworkName ===
                                            apiEnv.networkName &&
                                            st.networkActive,
                                        apiEnv.networkName ===
                                            API_ENV.customRPC &&
                                            showCustomRPCInput &&
                                            st.customRpcActive
                                    )}
                                />
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
            <AnimatePresence>
                {showCustomRPCInput && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: 'easeInOut',
                        }}
                        className={st.customRpc}
                    >
                        <CustomRPCInput />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NetworkSelector;
