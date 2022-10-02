// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { JsonRpcProvider } from "@mysten/sui.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Tooltip from "../../components/Tooltip";
import NFTDisplayCard from "../../components/nft-display";
import { AppState } from "../../hooks/useInitializedGuard";
import Loading from "_components/loading";
import { useAppDispatch, useAppSelector, useInitializedGuard } from "_hooks";
import {
  respondToPreapprovalRequest,
  preapprovalRequestsSelectors,
} from "_redux/slices/preapproval-requests";
import UserApproveContainer from "_src/ui/app/components/user-approve-container";

import type { SuiObject } from "@mysten/sui.js";
import type { RootState } from "_redux/RootReducer";

const truncateMiddle = (s = "", length = 6) =>
  s.length > length * 2.5
    ? `${s.slice(0, length)}...${s.slice(length * -1)}`
    : s;

type SuiMutableReference = {
  Struct: SuiStruct;
};

type SuiStruct = {
  address: string;
  module: string;
  name: string;
};

type SuiParameter = {
  MutableReference?: SuiMutableReference;
};

type PermissionInputArgs = {
  property: string;
  title: string;
  description?: string;
  defaultValue: string;
  onChange: (field: string, value: string) => void;
};

interface EnhancedSuiObject extends SuiObject {
  objectName: string;
  action: string;
}

const PermissionInput = ({
  property,
  title,
  description,
  defaultValue,
  onChange,
}: PermissionInputArgs) => {
  const [value, setValue] = useState<string>(defaultValue);

  const _handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange(property, e.target.value);
    },
    [onChange, property]
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm flex justify-between items-center">
        <div className="flex gap-1">
          <div className="font-bold">{title}</div>
          {description && (
            <Tooltip tooltipText={description}>
              <div className="cursor-help flex justify-center items-center rounded-full bg-gray-400 text-white text-xs h-5 w-5 scale-75">
                ?
              </div>
            </Tooltip>
          )}
        </div>
        <div>
          <input
            className="text-right border rounded-lg p-1"
            style={{ width: "6em" }}
            onChange={_handleChange}
            value={value}
          />
        </div>
      </div>
    </div>
  );
};

export function DappPreapprovalPage() {
  const guardLoading = useInitializedGuard([
    AppState.MNEMONIC,
    AppState.HOSTED,
  ]);

  const { preapprovalRequestID } = useParams();

  const dispatch = useAppDispatch();

  const preapprovalRequestsLoading = useAppSelector(
    ({ preapprovalRequests }) => !preapprovalRequests.initialized
  );
  const preapprovalRequestSelector = useMemo(
    () => (state: RootState) =>
      (preapprovalRequestID &&
        preapprovalRequestsSelectors.selectById(state, preapprovalRequestID)) ||
      null,
    [preapprovalRequestID]
  );
  const preapprovalRequest = useAppSelector(preapprovalRequestSelector);
  const preapproval = preapprovalRequest?.preapproval;

  // const nfts = useAppSelector(accountNftsSelector);
  // console.log('NFTS', nfts);
  // const nft = useMemo(() => {
  //     const selectedNFT = nfts.filter(
  //         (nftItem) =>
  //             getObjectId(nftItem.reference) === preapproval?.objectId
  //     )[0];
  //     return selectedNFT;
  // }, [nfts, preapproval?.objectId]);

  const loading = guardLoading || preapprovalRequestsLoading;

  const [changes, setChanges] = useState<Record<string, string>>({});
  const [nft, setNft] = useState<EnhancedSuiObject | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const onChange = useCallback((key: string, value: string) => {
    setChanges((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleOnSubmit = useCallback(
    async (approved: boolean) => {
      if (showError) {
        approved = false;
      }
      if (preapprovalRequest?.id) {
        await dispatch(
          respondToPreapprovalRequest({
            approved,
            changes,
            preapprovalRequestID: preapprovalRequest.id,
          })
        );
        window.close();
      }
    },
    [dispatch, preapprovalRequest, changes, showError]
  );

  useEffect(() => {
    if (!preapproval) return;

    const retrieveDetails = async () => {
      const provider = new JsonRpcProvider(
        process.env.API_ENDPOINT_DEV_NET_FULLNODE || ""
      );
      const functionDetails = await provider.getNormalizedMoveFunction(
        preapproval.packageObjectId,
        preapproval.module,
        preapproval.function
      );

      const onchainInfo = {
        action: "",
        objectName: "",
      };

      let mutableCount = 0;
      functionDetails.parameters.forEach((parameter) => {
        let key;
        let struct;
        for (key of Object.keys(parameter)) {
          if (!struct && key === "MutableReference") {
            struct = ((parameter as SuiParameter)[key] as SuiMutableReference)
              ?.Struct;
            mutableCount += 1;
          }
        }

        const affectsObject =
          struct?.address === preapproval.packageObjectId &&
          struct?.module === preapproval.module;

        if (affectsObject) {
          onchainInfo.action = key || "";
          onchainInfo.objectName = struct?.name || "";
        }
      });

      if (mutableCount !== 2) {
        setShowError(true);
        return;
      }

      const object = await provider.getObject(preapproval.objectId);
      const nft = {
        ...onchainInfo,
        ...(object.details as SuiObject),
      };

      setNft(nft);
    };

    retrieveDetails();
  }, [preapproval]);

  const permissionInputs = useMemo(
    () => [
      {
        property: "maxTransactionCount",
        title: "Max Transactions",
        description: "Only this # of transactions will be pre-approved.",
        defaultValue: (preapproval?.maxTransactionCount as number).toString(),
      },
      {
        property: "totalGasLimit",
        title: "Total Gas Limit",
        description:
          "Pre-approved transactions will not exceed this gas amount.",
        defaultValue: (preapproval?.totalGasLimit as number).toString(),
      },
    ],
    [preapproval]
  );

  const Details = () => {
    const [showDetails, setShowDetails] = useState(false);

    const _toggleDetails = useCallback(() => {
      setShowDetails((prev) => !prev);
    }, []);

    return (
      <div className="text-sm cursor-pointer relative" onClick={_toggleDetails}>
        <div className="flex justify-between items-center">
          <div>View Details</div>
          <div className="">
            {showDetails ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </div>
        </div>
        {showDetails && (
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex justify-between">
              <div className="text-gray-400">Module</div>
              <div>{preapproval?.module}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-400">Object</div>
              <div title={preapproval?.objectId}>
                {truncateMiddle(preapproval?.objectId, 6)}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-400">Function</div>
              <div>{preapproval?.function}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-400">Package</div>
              <div title={preapproval?.packageObjectId}>
                {truncateMiddle(preapproval?.packageObjectId)}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  let modifier;
  switch (nft?.action) {
    case "MutableReference":
      modifier = "modify";
      break;
    default:
      modifier = "read";
  }

  return (
    <Loading loading={loading}>
      {preapprovalRequest ? (
        <UserApproveContainer
          title="Pre-Approve Transactions"
          origin={preapprovalRequest.origin || ""}
          originFavIcon={preapprovalRequest.originFavIcon}
          approveTitle={showError ? "" : "Approve"}
          rejectTitle="Reject"
          onSubmit={handleOnSubmit}
        >
          {showError ? (
            <div className="p-24">
              Error: only one object can be mutated in a pre-approved
              transaction.
            </div>
          ) : (
            <>
              <div className="text-sm flex flex-col justify-center items-center">
                <div className="text-gray-500">
                  Transactions can only {modifier} this NFT:
                </div>
                {nft && (
                  <div className="text-xs my-3 text-center">
                    <NFTDisplayCard nftobj={nft} showlabel={true} />
                    <div className="pt-1">
                      {truncateMiddle(preapproval?.objectId || "")}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3 py-3 text-xs">
                  <div className="font-extrabold text-sm">Description</div>
                  <p className="text-gray-500">{preapproval?.description}</p>
                </div>
                <div className="flex flex-col gap-4">
                  {permissionInputs.map((info, index) => (
                    <PermissionInput
                      key={`permission-input-${index}`}
                      onChange={onChange}
                      {...info}
                    />
                  ))}
                  <Details />
                </div>
              </div>
            </>
          )}
        </UserApproveContainer>
      ) : (
        <></>
      )}
    </Loading>
  );
}
