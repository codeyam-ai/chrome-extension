// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isBasePayload } from "_payloads";

import type { Preapproval } from "./Preapproval";
import type { BasePayload, Payload } from "_payloads";

export interface PreapprovalResponse extends BasePayload {
  type: "preapproval-response";
  id: string;
  approved: boolean;
  preapproval: Preapproval;
}

export function isPreapprovalResponse(
  payload: Payload
): payload is PreapprovalResponse {
  return isBasePayload(payload) && payload.type === "preapproval-response";
}
