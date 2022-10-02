// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from "_payloads";

import type { BasePayload, Payload } from "_payloads";

export interface DisconnectResponse extends BasePayload {
  type: "disconnect-response";
  success: boolean;
}

export function isExecuteTransactionResponse(
  payload: Payload
): payload is DisconnectResponse {
  return isBasePayload(payload) && payload.type === "disconnect-response";
}
