// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import logo from "../../components/logo/ethos-logo.png";
import { AppState } from "../../hooks/useInitializedGuard";
import Button, { ButtonStyle } from "../../shared/Button";
import BackButton from "./BackButton";
import Loading from "_components/loading";
import { useInitializedGuard } from "_hooks";

// const greenCheck = (
//     <svg
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 24 24"
//         strokeWidth={1.5}
//         stroke="currentColor"
//         className="w-5 h-5 text-green-500"
//     >
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M4.5 12.75l6 6 9-13.5"
//         />
//     </svg>
// );

const RecoveryPhrasePage = () => {
  const checkingInitialized = useInitializedGuard(AppState.UNINITIALIZED);
  return (
    <Loading loading={checkingInitialized}>
      <BackButton to="/welcome" />
      <div className="text-center py-4 text-base">
        <h1 className="mb-4 font-semibold tracking-tight">
          <img src={logo} className="h-36 mx-auto pb-3" alt="" />
          <span className="block text-5xl">Ethos</span>
          <span className="block text-ethos-primary dark:text-violet-400 font-thin text-lg mb-4">
            The new web awaits
          </span>
        </h1>
        <p className="mb-4">
          Control and safekeep your wallet <br /> using a recovery phrase
        </p>
        {/* <div className="text-sm pb-3 ml-[5.5rem]">
                    <div className="flex flex-row">{greenCheck}100% secure</div>
                    <div className="flex flex-row">
                        {greenCheck}Encrypted at rest
                    </div>
                    <div className="flex flex-row">
                        {greenCheck}Zero tracking
                    </div>
                </div> */}
        <Button buttonStyle={ButtonStyle.PRIMARY} to="/initialize/create">
          Create a new wallet
        </Button>
        <Button
          buttonStyle={ButtonStyle.SECONDARY}
          to="/initialize/import"
          className="mt-2"
        >
          Import recovery phrase
        </Button>
      </div>
    </Loading>
  );
};

export default RecoveryPhrasePage;
