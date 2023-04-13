// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

export const ALL_PERMISSION_TYPES = [
    'viewAccount',
    'suggestTransactions',
    'suggestSignMessages',
    'setAccountCustomizations',
    'setContacts',
    'setFavorites',
    'viewContacts',
    'viewFavorites',
    'switchAccount',
] as const;

export const EXPLORER_PERMISSIONS = [
    'setAccountCustomizations',
    'setContacts',
    'setFavorites',
    'viewContacts',
    'viewFavorites',
];

type AllPermissionsType = typeof ALL_PERMISSION_TYPES;
export type PermissionType = AllPermissionsType[number];
