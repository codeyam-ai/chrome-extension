import { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Browser from "webextension-polyfill";

import ExternalLink from "../../external-link";
import { SuiIcons } from "../../icon";
import LoadingIndicator from "../../loading/LoadingIndicator";
import { useNextMenuUrl } from "../hooks";
import Item from "./menu-list/item";
import { API_ENV_TO_INFO } from "_app/ApiProvider";
import { IFRAME_URL, ToS_LINK } from "_src/shared/constants";
import { getEncrypted } from "_src/shared/storagex/store";
import { iframe } from "_src/ui/app/helpers";
import { useAppDispatch, useAppSelector } from "_src/ui/app/hooks";
import { getEmail, reset } from "_src/ui/app/redux/slices/account";

import st from "./menu-list/MenuList.module.scss";

const eyeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const version = Browser.runtime.getManifest().version;

export default function Settings() {
  const networkUrl = useNextMenuUrl(true, "/network");
  const apiEnv = useAppSelector((state) => state.app.apiEnv);
  const networkName = API_ENV_TO_INFO[apiEnv].name;

  const viewSeedUrl = useNextMenuUrl(true, "/settings/view-seed");
  const dispatch = useAppDispatch();
  const [logoutInProgress, setLogoutInProgress] = useState(false);
  const [isHostedWallet, setIsHostedWallet] = useState(false);

  const handleReset = useCallback(async () => {
    setLogoutInProgress(true);
    // iframe.listenForLogout();
    const email = await dispatch(getEmail());
    if (!email) return;
    iframe.onReady(async () => await iframe.logOut(email.payload as string));
  }, [dispatch]);

  useEffect(() => {
    const listenForLogOut = async () => {
      await iframe.listenForLogout();

      try {
        await dispatch(reset());
      } finally {
        setLogoutInProgress(false);
      }
    };
    listenForLogOut();
  }, [dispatch]);

  useEffect(() => {
    const _setIsHosted = async () => {
      const authentication = await getEncrypted("authentication");
      setIsHostedWallet(authentication !== null);
    };
    _setIsHosted();
  }, []);

  useEffect(() => {
    iframe.listenForReady();
  }, [dispatch]);

  return (
    <div
      className={
        st.container + " divide-y divide-gray-700/50 dark:divide-gray-400/50"
      }
    >
      {!isHostedWallet && (
        <Link className={st.item} to={viewSeedUrl}>
          <Item
            svg={eyeIcon}
            title="View recovery phrase"
            indicator={SuiIcons.SuiChevronRight}
          />
        </Link>
      )}
      <ExternalLink className={st.item} href={ToS_LINK} showIcon={false}>
        <Item
          icon="file-earmark-text"
          title="Terms of Service"
          indicator="link-45deg"
        />
      </ExternalLink>
      <Link to={networkUrl} className={st.item}>
        <Item
          icon={SuiIcons.Globe}
          title="Network"
          subtitle={networkName}
          indicator={SuiIcons.SuiChevronRight}
        />
      </Link>
      <div className={st.item}>
        <Item
          // TODO: import and use the icon from Figma
          icon={SuiIcons.VersionIcon}
          title="Wallet version"
          subtitle={"v" + version}
        />
      </div>
      <span onClick={handleReset} className={st.item}>
        {logoutInProgress ? (
          <LoadingIndicator />
        ) : (
          <Item icon={SuiIcons.Logout} title="Reset" />
        )}
      </span>
      <iframe
        id="wallet-iframe"
        src={IFRAME_URL}
        height="1px"
        width="1px"
        title="wallet"
        // Hide the iframe pixel, as it is visible in dark mode
        className="-top-[1000px] absolute"
      />
    </div>
  );
}
