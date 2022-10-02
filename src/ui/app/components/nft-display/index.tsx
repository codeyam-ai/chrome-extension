// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import cl from "classnames";

import ExplorerLink from "_components/explorer-link";
import { ExplorerLinkType } from "_components/explorer-link/ExplorerLinkType";
import { useNFTBasicData } from "_hooks";

import type { SuiObject as SuiObjectType } from "@mysten/sui.js";

import st from "./NFTDisplay.module.scss";

export type NFTsProps = {
  nftobj: SuiObjectType;
  showlabel?: boolean;
  size?: "small" | "medium" | "large";
  expandable?: boolean;
  wideview?: boolean;
};

function NFTDisplayCard({
  nftobj,
  showlabel,
  size = "medium",
  expandable,
  wideview,
}: NFTsProps) {
  const { filePath, nftObjectID, nftFields, fileExtentionType } =
    useNFTBasicData(nftobj);

  const wideviewSection = (
    <div className={st.nftfields}>
      <div className="capitalize dark:text-white overflow-hidden overflow-ellipsis whitespace-nowrap">
        {nftFields?.name}
      </div>
      <div className={st.nftType}>
        {fileExtentionType?.name} {fileExtentionType.type}
      </div>
    </div>
  );
  const defaultSection = (
    <>
      {expandable ? (
        <div className="flex items-center content-center mt-3">
          <ExplorerLink
            type={ExplorerLinkType.object}
            objectID={nftObjectID}
            showIcon={false}
            className="text-purple-700 hover:text-purple-800 dark:text-violet-400 dark:hover:text-violet-300"
          >
            View On Sui Explorer →
          </ExplorerLink>
        </div>
      ) : null}
      {showlabel && nftFields?.name ? (
        <div className={st.nftfields + " dark:text-gray-400"}>
          {nftFields.name}
        </div>
      ) : null}
    </>
  );

  return (
    <div
      className={cl(
        st.nftimage,
        wideview &&
          st.wideview +
            " dark:bg-gray-700 dark:border-gray-500 dark:border-[1px]"
      )}
    >
      {filePath && (
        <img
          className={cl(st.img, st[size])}
          src={filePath}
          alt={fileExtentionType?.name || "NFT"}
        />
      )}
      {wideview ? wideviewSection : defaultSection}
    </div>
  );
}

export default NFTDisplayCard;
