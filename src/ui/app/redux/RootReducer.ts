// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { combineReducers } from '@reduxjs/toolkit';

import account from './slices/account';
import app from './slices/app';
import balances from './slices/balances';
import contacts from './slices/contacts';
import forms from './slices/forms';
import permissions from './slices/permissions';
import preapprovalRequests from './slices/preapproval-requests';
import suiObjects from './slices/sui-objects';
import transactionRequests from './slices/transaction-requests';
import transactions from './slices/transactions';
//import txresults from './slices/txresults';
import valid from './slices/valid';

const rootReducer = combineReducers({
    account,
    app,
    suiObjects,
    balances,
    transactions,
    //txresults,
    permissions,
    forms,
    transactionRequests,
    preapprovalRequests,
    contacts,
    valid,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
