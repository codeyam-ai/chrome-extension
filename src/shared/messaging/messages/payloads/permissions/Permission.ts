// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { PermissionType } from './PermissionType';

export interface Permission {
    id: string;
    origin: string;
    favIcon: string | undefined;
    title: string | undefined;
    accounts: string[];
    allowed: boolean | null;
    permissions: PermissionType[];
    createdDate: string;
    responseDate: string | null;
}
