import { BASE_URL, LOGIN_URL } from "_src/shared/constants";

import type { SuiJsonValue, TypeTag } from "@mysten/sui.js";

export interface IframeMessage {
  action: string;
}

export interface IframeData {
  appId?: string;
}

export interface IframeLoginData extends IframeData {
  email: string;
  returnTo: string;
  provider?: string;
}

export interface IframeLogOutData extends IframeData {
  email: string;
  appId: string;
  wallet: boolean;
}

// export interface IframeConnectAppData extends IframeData {
//     readonly permissions: PermissionType[];
// }

export interface EthosTransactionData {
  network: string;
  address: string;
  moduleName: string;
  functionName: string;
  typeArguments: TypeTag[];
  inputValues: SuiJsonValue[];
  gasPayment?: string | undefined;
  gasBudget: number;
}

export interface TransactionData extends IframeData {
  details: EthosTransactionData;
}

export type EthosAccount = {
  chain: string;
  address: string;
};

export type EthosUser = {
  accounts: EthosAccount[];
};

export type EthosConnectApp = {
  appId: string;
  user: EthosUser;
};

export type EthosTransaction = {
  appId: string;
};

export interface IframeLoginMessage extends IframeMessage {
  data: IframeLoginData;
}

export interface IframeLogOutMessage extends IframeMessage {
  data: IframeLogOutData;
}

export interface ConnectAppMessage extends IframeMessage {
  data: IframeData;
}

export interface TransactionMessage extends IframeMessage {
  data: TransactionData;
}

const listenForLogout = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const logoutEventListener = (message: MessageEvent) => {
      if (message.origin === BASE_URL) {
        const { action } = message.data;
        if (action !== "logoutComplete") return;
        window.removeEventListener("message", logoutEventListener);

        resolve();
      }
    };

    window.addEventListener("message", logoutEventListener);
  });
};

const listenForReady = () => {
  const readyEventListener = (message: MessageEvent) => {
    if (message.origin === BASE_URL) {
      const { action } = message.data;
      if (action !== "ready") return;
      const iframe = get();
      iframe?.setAttribute("readyToReceiveMessages", "true");

      window.removeEventListener("message", readyEventListener);
    }
  };

  window.addEventListener("message", readyEventListener);
};

const listenForUser = () => {
  const userEventListener = (message: MessageEvent) => {
    if (message.origin === BASE_URL) {
      const { action, data } = message.data;
      if (action !== "user" || !data) return;
      const iframe = get();
      iframe?.setAttribute("userReady", "true");
      window.removeEventListener("message", userEventListener);
    }
  };

  window.addEventListener("message", userEventListener);
};

const get = () => {
  if (typeof document === "undefined") {
    return;
  }
  return document.getElementById("wallet-iframe") as HTMLIFrameElement;
};

const onReady = (fun: () => void) => {
  const iframe = get();

  if (!iframe?.getAttribute("readyToReceiveMessages")) {
    setTimeout(() => {
      onReady(fun);
    }, 100);
    return;
  }

  fun();
};

const onUser = (fun: () => void) => {
  const iframe = get();

  if (!iframe?.getAttribute("userReady")) {
    setTimeout(() => {
      onUser(fun);
    }, 100);
    return;
  }

  fun();
};

const messageWallet = (
  message:
    | IframeLoginMessage
    | IframeLogOutMessage
    | ConnectAppMessage
    | TransactionMessage
) => {
  const iframe = get();
  if (!iframe) return;

  message.data.appId = "ethos";

  iframe.contentWindow?.postMessage(message, "*");
};

const login = (email: string) => {
  return new Promise((resolve, reject) => {
    const loginEventListener = (message: MessageEvent) => {
      if (message.origin === BASE_URL) {
        const { action, data } = message.data;
        if (action !== "login") return;
        window.removeEventListener("message", loginEventListener);

        resolve(data);
      }
    };

    window.addEventListener("message", loginEventListener);

    onReady(() => {
      messageWallet({
        action: "login",
        data: {
          email,
          returnTo: LOGIN_URL,
        },
      });
    });
  });
};

const logOut = (email: string) => {
  return new Promise((resolve, reject) => {
    const logOutEventListener = (message: MessageEvent) => {
      if (message.origin === BASE_URL) {
        const { action, data } = message.data;
        if (action !== "logout") return;
        window.removeEventListener("message", logOutEventListener);

        resolve(data);
      }
    };

    window.addEventListener("message", logOutEventListener);

    onReady(() => {
      messageWallet({
        action: "logout",
        data: {
          email,
          appId: "ethos",
          wallet: true,
        },
      });
    });
  });
};

const listenForAccessToken = () => {
  return new Promise<string>((resolve, reject) => {
    const accessTokenEventListener = (message: MessageEvent) => {
      if (message.origin === BASE_URL) {
        const { action, data } = message.data;
        if (action !== "sendKey" || !data?.key) return;
        window.removeEventListener("message", accessTokenEventListener);
        const key = JSON.parse(data.key);
        resolve(key.currentSession.access_token);
      }
    };

    window.addEventListener("message", accessTokenEventListener);
  });
};

const connectApp = (): Promise<EthosConnectApp> => {
  return new Promise((resolve, reject) => {
    const loginEventListener = (message: MessageEvent) => {
      if (message.origin === BASE_URL) {
        const { action, data } = message.data;
        if (action !== "user") return;
        window.removeEventListener("message", loginEventListener);

        resolve(data as EthosConnectApp);
      }
    };

    window.addEventListener("message", loginEventListener);

    messageWallet({
      action: "activeUser",
      data: {},
    });
  });
};

const iframe = {
  listenForReady,
  listenForUser,
  listenForLogout,
  listenForAccessToken,
  get,
  onReady,
  onUser,
  messageWallet,
  login,
  logOut,
  connectApp,
};

export default iframe;
