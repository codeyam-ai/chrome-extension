// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from "_payloads";

import type { BasePayload, Payload } from "_payloads";

export interface GetPreapprovalRequests extends BasePayload {
  type: "get-preapproval-requests";
}

export function isGetPreapprovalRequests(
  payload: Payload
): payload is GetPreapprovalRequests {
  return isBasePayload(payload) && payload.type === "get-preapproval-requests";
}
