// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import cl from "classnames";
import { memo } from "react";

import darkGradientBackground from "../../../assets/images/dark-gradient-background.jpg";
import lightGradientBackground from "../../../assets/images/light-gradient-background.jpg";
import Loading from "_components/loading";
import { useAppSelector, useFullscreenGuard } from "_hooks";
import { getNavIsVisible } from "_redux/slices/app";

import type { ReactNode } from "react";

import st from "./Layout.module.scss";

export type PageLayoutProps = {
  limitToPopUpSize?: boolean;
  forceFullscreen?: boolean;
  children: ReactNode | ReactNode[];
};

function PageLayout({
  limitToPopUpSize = false,
  forceFullscreen = false,
  children,
}: PageLayoutProps) {
  const guardLoading = useFullscreenGuard(forceFullscreen);
  const isNavVisible = useAppSelector(getNavIsVisible);

  return (
    <Loading loading={guardLoading}>
      <div className="relative flex sm:min-h-screen sm:w-full flex-col justify-center overflow-hidden bg-white dark:bg-gray-800 sm:bg-[#f9fafc] dark:sm:bg-[#0a1121]">
        {/* Show light gradieent backdrop during light theme, and vice versa */}
        <img
          src={lightGradientBackground}
          alt=""
          className="absolute h-full hidden sm:block dark:sm:hidden"
          width={1308}
        />
        <img
          src={darkGradientBackground}
          alt=""
          className="absolute h-full hidden dark:sm:block"
          width={1308}
        />
        <div className="relative mx-auto">
          <div
            className={cl(st.container, {
              [st.forcedPopupSize]: limitToPopUpSize,
              [st.navHidden]: !isNavVisible,
            })}
          >
            {children}
          </div>
        </div>
      </div>
      {/* <div
                className={cl(st.container, {
                    [st.forcedPopupSize]: limitToPopUpSize,
                    [st.navHidden]: !isNavVisible,
                })}
            >
                {children}
            </div> */}
    </Loading>
  );
}

export default memo(PageLayout);
