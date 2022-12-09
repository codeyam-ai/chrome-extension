// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import * as Yup from 'yup';
import { SUI_ADDRESS_VALIDATION } from '_components/address-input/validation';

export function createValidationSchema(senderAddress: string) {
    return Yup.object({
        to: SUI_ADDRESS_VALIDATION.test(
            'sender-address',
            // eslint-disable-next-line no-template-curly-in-string
            `NFT is owned by this address`,
            (value) => senderAddress !== value
        ),
    });
}
