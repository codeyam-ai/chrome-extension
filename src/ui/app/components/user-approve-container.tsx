// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useCallback, useState } from 'react';

import InlineButtonGroup from '../shared/buttons/InlineButtonGroup';
import HeaderWithIconRow from '../shared/headers/page-headers/HeaderWithIconRow';
import ApproveContainerNavBar from '../shared/navigation/nav-bar/ApproveContainerNavBar';
import LoadingIndicator from '_components/loading/LoadingIndicator';

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
        setSubmitting(true);
        onSubmit(true);
    }, [onSubmit]);

    const reject = useCallback(() => {
        onSubmit(false);
    }, [onSubmit]);

    return (
        <div className="no-scrollbar w-full text-ethos-light-text-default dark:text-ethos-dark-text-default bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
            <ApproveContainerNavBar reject={reject} />
            <HeaderWithIconRow
                iconSrc={originFavIcon}
                iconAlt={`${originTitle} icon`}
                title={title}
                description={description}
            />
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
    );
}

export default memo(UserApproveContainer);
