// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useCallback, useState } from 'react';

import logo from '../components/logo/ethos-logo.png';
import Button, { ButtonStyle } from '../shared/Button';
import AccountAddress, { AddressMode } from '_components/account-address';
import LoadingIndicator from '_components/loading/LoadingIndicator';

import type { MouseEventHandler, ReactNode } from 'react';

type UserApproveContainerProps = {
    title: string;
    children: ReactNode | ReactNode[];
    origin: string;
    originFavIcon?: string;
    originTitle?: string;
    rejectTitle: string;
    approveTitle: string;
    onSubmit: (approved: boolean) => void;
};

function UserApproveContainer({
    title,
    origin,
    originFavIcon,
    originTitle,
    children,
    rejectTitle,
    approveTitle,
    onSubmit,
}: UserApproveContainerProps) {
    const [submitting, setSubmitting] = useState(false);
    const handleOnResponse = useCallback<MouseEventHandler<HTMLButtonElement>>(
        async (e) => {
            setSubmitting(true);
            const allowed = e.currentTarget.dataset.allow === 'true';
            await onSubmit(allowed);
            setSubmitting(false);
        },
        [onSubmit]
    );
    const reject = useCallback(() => {
        onSubmit(false);
    }, [onSubmit]);
    return (
        <div className="flex flex-col w-full px-6 py-1 items-center dark:bg-gray-800">
            <div className="flex w-full items-center justify-between pb-3">
                <div className="text-base cursor-pointer" onClick={reject}>
                    ✕
                </div>
                <div className="px-2 rounded-md bg-gray-200">
                    <AccountAddress
                        className="py-2"
                        showLink={false}
                        mode={AddressMode.SMALL}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1 py-3">
                <div className="flex items-center justify-center">
                    <img src={logo} className="h-12" alt="" />
                </div>
                <div className="text-xl">{title}</div>
            </div>

            <div className="w-full">{children}</div>

            <div className="w-full flex flex-row items-center pt-6 gap-2">
                <Button
                    buttonStyle={ButtonStyle.SECONDARY}
                    type="button"
                    data-allow="false"
                    onClick={handleOnResponse}
                    disabled={submitting}
                    className="mt-2"
                >
                    {rejectTitle}
                </Button>
                <Button
                    buttonStyle={ButtonStyle.PRIMARY}
                    type="button"
                    data-allow="true"
                    disabled={submitting}
                    onClick={handleOnResponse}
                    className="mt-2"
                >
                    {submitting ? <LoadingIndicator /> : approveTitle}
                </Button>
                {/* <button
                        className="w-full mt-3 inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 disabled:text-purple-500 disabled:bg-gray-200 disabled:hover:bg-gray-200"
                    >
                    </button>
                    <button
                        type="button"
                        data-allow="true"
                        disabled={submitting}
                        onClick={handleOnResponse}
                        className="w-full mt-3 inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800 disabled:bg-purple-500 disabled:hover:bg-purple-500"
                    >
                        {submitting ? <LoadingIndicator /> : approveTitle}
                    </button> */}
            </div>
        </div>
    );
}

export default memo(UserApproveContainer);
