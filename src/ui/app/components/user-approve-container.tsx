// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useCallback, useState } from 'react';

import Button, { ButtonStyle } from '../shared/buttons/Button';
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
        <div className="flex flex-col w-full px-6 py-1 items-center dark:bg-gray-800">
            <div className="flex w-full items-center justify-between pb-3">
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

            <div className="flex flex-col gap-1 pt-3 pb-3">
                <div className="flex items-center justify-center">
                    {originFavIcon && originFavIcon.length > 0 && (
                        <img
                            src={originFavIcon}
                            className="h-12"
                            alt={`${originTitle} icon`}
                            onError={hideIcon}
                        />
                    )}
                </div>
                <div className="text-xl text-center dark:text-gray-200">
                    {title}
                </div>
                <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                    {description}
                </div>
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
                    buttonStyle={ButtonStyle.SECONDARY}
                    type="button"
                    data-allow="false"
                    onClick={handleOnResponse}
                    disabled={submitting}
                    isInline={true}
                >
                    {rejectTitle}
                </Button>
                <Button
                    buttonStyle={ButtonStyle.PRIMARY}
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
