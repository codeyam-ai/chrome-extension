// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useEffect } from 'react';

import LoadingIndicator from './LoadingIndicator';

import type { ReactNode } from 'react';

type LoadingProps = {
    loading: boolean;
    children: ReactNode | ReactNode[];
    className?: string;
    big?: boolean;
    resize?: boolean;
};

const Loading = ({
    loading,
    children,
    className,
    big,
    resize = false,
}: LoadingProps) => {
    useEffect(() => {
        if (loading || !resize) return;

        const resizeWindow = () => {
            window.resizeTo(window.outerWidth, document.body.offsetHeight + 39);
        };

        resizeWindow();
        Promise.all(
            Array.from(document.images)
                .filter((img) => !img.complete)
                .map(
                    (img) =>
                        new Promise((resolve) => {
                            img.onload = img.onerror = resolve;
                        })
                )
        ).then(() => {
            resizeWindow();
            for (let i = 0; i < 10; ++i) {
                setTimeout(resizeWindow, 250 * (i + 1));
            }
        });
    }, [loading, resize]);

    return loading ? (
        className ? (
            <div className={className}>
                <LoadingIndicator big={big} />
            </div>
        ) : (
            <LoadingIndicator big={big} />
        )
    ) : (
        <>{children}</>
    );
};

export default memo(Loading);
