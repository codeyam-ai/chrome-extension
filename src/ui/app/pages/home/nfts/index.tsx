// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { hasPublicTransfer } from "@mysten/sui.js";
import { Link } from "react-router-dom";

import { Content } from "_app/shared/bottom-menu-layout";
import PageTitle from "_app/shared/page-title";
import NFTdisplay from "_components/nft-display";
import { useAppSelector } from "_hooks";
import { accountNftsSelector } from "_redux/slices/account";
import { NFT_EXPERIMENT_LINK } from "_src/shared/constants";
import Icon, { SuiIcons } from "_src/ui/app/components/icon";

import st from "./NFTPage.module.scss";

function NftsPage() {
  const nfts = useAppSelector(accountNftsSelector) || [];

  return (
    <div className={st.container}>
      {nfts.length <= 0 ? (
        <div className="text-center my-auto text-gray-900 dark:text-white">
          <Icon className="text-4xl " icon={SuiIcons.Nfts} />
          <h3 className="text-lg leading-6 font-medium">No NFTs yet</h3>
          <div className="mt-2">
            <p>
              <a
                href={NFT_EXPERIMENT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-700 hover:text-purple-800 dark:text-violet-400 dark:hover:text-violet-300"
              >
                Explore creating your own digital asset →
              </a>
            </p>
          </div>
        </div>
      ) : (
        <>
          <PageTitle
            title="NFTs"
            // stats={`${nfts.length}`}
            className={st.pageTitle}
          />
          <Content>
            <section className={st.nftGalleryContainer}>
              <section className={st.nftGallery}>
                {nfts
                  .filter((nft) => hasPublicTransfer(nft))
                  .map((nft, index) => (
                    <Link
                      to={`/nft-details?${new URLSearchParams({
                        objectId: nft.reference.objectId,
                      }).toString()}`}
                      key={index}
                    >
                      <NFTdisplay nftobj={nft} showlabel={true} />
                    </Link>
                  ))}
              </section>
            </section>
          </Content>
        </>
      )}
    </div>
  );
}

export default NftsPage;
