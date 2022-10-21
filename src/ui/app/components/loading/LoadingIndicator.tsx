// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import st from './LoadingIndicator.module.scss';

const LoadingIndicator = ({ big }: { big?: boolean }) => {
    return (
        <span
            className={st.spinner}
            style={
                big ? { width: '3em', height: '3em', marginTop: '24px' } : {}
            }
        />
    );
};

export default LoadingIndicator;
