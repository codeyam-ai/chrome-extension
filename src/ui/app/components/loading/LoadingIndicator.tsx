// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import cl from 'classnames';

import st from './LoadingIndicator.module.scss';

const LoadingIndicator = ({
    className,
    big,
}: {
    className?: string;
    big?: boolean;
}) => {
    return (
        <span
            className={cl(st.spinner, className)}
            style={
                big ? { width: '3em', height: '3em', marginTop: '24px' } : {}
            }
        />
    );
};

export default LoadingIndicator;
