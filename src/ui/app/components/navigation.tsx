// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo } from "react";
import { NavLink } from "react-router-dom";

import { useExplorerPermission } from "../hooks";
import Divider from "../shared/Divider";
import ExternalLink from "./external-link";
import Icon, { SuiIcons } from "_components/icon";
import { DASHBOARD_LINK } from "_src/shared/constants";

function makeLinkCls({ isActive }: { isActive: boolean }) {
  return (
    "mx-auto p-4 transition ease-in-out hover:text-gray-700 duration-300 " +
    (isActive ? "text-gray-700" : "text-gray-400")
  );
}

const navItems = [
  {
    title: "Tokens",
    to: "./tokens",
    icon: SuiIcons.CurrencyDollar,
  },
  {
    title: "NFTs",
    to: "./nfts",
    icon: SuiIcons.Grid,
  },
  {
    title: "Explore",
    to: DASHBOARD_LINK,
    icon: SuiIcons.Globe,
  },
  {
    title: "History",
    to: "./transactions",
    icon: SuiIcons.History,
  },
];

export type NavigationProps = {
  className?: string;
};

function Navigation({ className }: NavigationProps) {
  const setExplorerPermission = useExplorerPermission();

  // const isVisible = useAppSelector(getNavIsVisible);
  return (
    <div className="flex flex-col w-full">
      <Divider />

      <nav className="flex flex-row  h-8 w-full items-center py-8 px-4">
        <>
          {navItems.map((item, key) => {
            return (
              <div
                className="w-full flex flex-row items-center"
                key={key}
                onMouseOver={
                  item.to.startsWith("http") ? setExplorerPermission : undefined
                }
              >
                {item.to.startsWith("http") ? (
                  <ExternalLink
                    href={item.to}
                    className={makeLinkCls({
                      isActive: false,
                    })}
                    title={item.title}
                    showIcon={false}
                  >
                    <Icon className="text-2xl" icon={item.icon} />
                  </ExternalLink>
                ) : (
                  <NavLink
                    to={item.to}
                    className={makeLinkCls({
                      isActive: false,
                    })}
                    title={item.title}
                  >
                    <Icon className="text-2xl" icon={item.icon} />
                  </NavLink>
                )}
              </div>
            );
          })}
        </>
      </nav>
    </div>
  );
}

export default memo(Navigation);
