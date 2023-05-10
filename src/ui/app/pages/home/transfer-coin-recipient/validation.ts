// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import * as Yup from 'yup';

import { SUI_ADDRESS_VALIDATION } from '_components/address-input/validation';
import safeAddress from '_src/ui/app/helpers/safeAddress';

export function createValidationSchema(senderAddress: string) {
    const safeSenderAddress = safeAddress(senderAddress);

    return Yup.object({
        to: SUI_ADDRESS_VALIDATION.test(
            'sender-address',
            // eslint-disable-next-line no-template-curly-in-string
            `Cannot send Sui to sender's address`,
            (value) => safeSenderAddress !== value
        ),
    });
}
