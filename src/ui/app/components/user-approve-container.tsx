// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useCallback, useState } from 'react';

import { startWalletLockTimer } from '../helpers/lock-wallet';
import InlineButtonGroup from '../shared/buttons/InlineButtonGroup';
import UserApproveHeaderWithSiteIcon from '../shared/headers/page-headers/UserApproveHeaderWithSiteIcon';
import ApproveContainerNavBar from '../shared/navigation/nav-bar/ApproveContainerNavBar';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import { BASE_URL } from '_src/shared/constants';

import type { ReactNode } from 'react';

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
    hasError?: boolean;
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
    hasError,
}: UserApproveContainerProps) {
    const [submitting, setSubmitting] = useState(false);

    const approve = useCallback(() => {
        startWalletLockTimer();
        setSubmitting(true);
        onSubmit(true);
    }, [onSubmit]);

    const reject = useCallback(() => {
        startWalletLockTimer();
        onSubmit(false);
    }, [onSubmit]);

    return (
        <div className="pb-10 no-scrollbar w-full text-ethos-light-text-default dark:text-ethos-dark-text-default bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
            <ApproveContainerNavBar reject={reject} />
            <UserApproveHeaderWithSiteIcon
                iconSrc={originFavIcon}
                iconAlt={`${originTitle} icon`}
                isConnectingToEthosDashboard={origin === BASE_URL}
                title={title}
                description={description}
            />
            <div className={'max-w-lg m-auto'}>
                <div className="w-full">{children}</div>
                {!hasError && (
                    <InlineButtonGroup
                        onClickButtonPrimary={approve}
                        buttonPrimaryType="button"
                        buttonPrimaryChildren={
                            submitting ? <LoadingIndicator /> : approveTitle
                        }
                        isButtonPrimaryDisabled={submitting}
                        onClickButtonSecondary={reject}
                        buttonSecondaryType="button"
                        buttonSecondaryChildren={rejectTitle}
                        isButtonSecondaryDisabled={submitting}
                    />
                )}
            </div>
        </div>
    );
}

export default memo(UserApproveContainer);
