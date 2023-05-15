// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

export const queryConfig = {
    defaultOptions: {
        queries: {
            // Only retry once by default:
            retry: 1,
            // TODO: Rather than disabling all automatic refetching, we should find sane defaults here:
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchInterval: 0,
            refetchIntervalInBackground: false,
        },
    },
};