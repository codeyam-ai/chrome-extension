// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useCallback, useState } from 'react';

import Button from '../shared/buttons/Button';
import Ethos from '../shared/svg/Ethos';
import AccountAddress, { AddressMode } from '_components/account-address';
import LoadingIndicator from '_components/loading/LoadingIndicator';

import type { MouseEventHandler, ReactNode, SyntheticEvent } from 'react';

type UserApproveContainerProps = {
    title: string;
    children: ReactNode | ReactNode[];
    origin: string;
    originFavIcon?: string;
    originTitle?: string;
    description?: string;
    rejectTitle: string;
    approveTitle: string;
    onSubmit: (approved: boolean) => void;
};

function UserApproveContainer({
    title,
    origin,
    originFavIcon,
    originTitle,
    description,
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
    const hideIcon = useCallback(
        (e: SyntheticEvent<HTMLImageElement, Event>) => {
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
        },
        []
    );
    return (
        <div className="flex flex-col w-full px-6 items-center dark:bg-gray-800">
            <div className="flex w-full items-center justify-between pt-5 pb-6 border-b border-slate-400 dark:border-slate-600">
                <div
                    className="text-base cursor-pointer dark:text-gray-200"
                    onClick={reject}
                >
                    ✕
                </div>
                <div className="px-2 rounded-md bg-gray-200 dark:bg-gray-700">
                    <AccountAddress
                        className="py-2"
                        showLink={false}
                        mode={AddressMode.SMALL}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1 py-6">
                <div className="flex items-center justify-center">
                    {originFavIcon && originFavIcon.length > 0 && (
                        <img
                            src={originFavIcon}
                            className="z-10 h-12 border-white dark:border-black border-2 rounded-full"
                            alt={`${originTitle} icon`}
                            onError={hideIcon}
                        />
                    )}
                    <div className="-ml-3">
                        <Ethos />
                    </div>
                </div>
                <div className="text-xl text-center dark:text-gray-200 py-1">
                    {title}
                </div>
                {description && (
                    <div className="text-center text-gray-500 dark:text-gray-400 text-sm py-1">
                        {description}
                    </div>
                )}
            </div>

            <div className="w-full">{children}</div>

            {/* <InlineButtonGroup
                buttonPrimaryChildren={rejectTitle}
                isButtonPrimaryDisabled={submitting}
                onClickButtonPrimary={handleOnResponse}
                buttonSecondaryChildren={
                    submitting ? <LoadingIndicator /> : approveTitle
                }
                isButtonSecondaryDisabled={submitting}
                onClickButtonSecondary={handleOnResponse}
            /> */}

            <div className={`grid grid-cols-2 gap-2 w-full mt-2`}>
                <Button
                    buttonStyle="secondary"
                    type="button"
                    data-allow="false"
                    onClick={handleOnResponse}
                    disabled={submitting}
                    isInline={true}
                >
                    {rejectTitle}
                </Button>
                <Button
                    buttonStyle="primary"
                    type="button"
                    data-allow="true"
                    disabled={submitting}
                    onClick={handleOnResponse}
                    isInline={true}
                >
                    {submitting ? <LoadingIndicator /> : approveTitle}
                </Button>
            </div>
        </div>
    );
}

export default memo(UserApproveContainer);
