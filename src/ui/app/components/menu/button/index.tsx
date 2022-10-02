// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import cl from "classnames";
import { memo } from "react";
import { Link } from "react-router-dom";

import { useMenuIsOpen, useNextMenuUrl } from "_components/menu/hooks";

import st from "./MenuButton.module.scss";

export type MenuButtonProps = {
  className?: string;
};

function MenuButton({ className }: MenuButtonProps) {
  const isOpen = useMenuIsOpen();
  const menuUrl = useNextMenuUrl(!isOpen, "/");
  return (
    <Link to={menuUrl}>
      <div className={cl(st.button, { [st.open]: isOpen }, className)}>
        <span className={cl(st.line, st.line1)} />
        <span className={cl(st.line, st.line2)} />
        <span className={cl(st.line, st.line3)} />
      </div>
    </Link>
  );
}

export default memo(MenuButton);
