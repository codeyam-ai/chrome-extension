import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { fromB64 } from '@mysten/bcs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSuiLedgerClient } from '../../components/ledger/SuiLedgerClientProvider';
import formatUrl from '../../helpers/format-url';
import { AppState } from '../../hooks/useInitializedGuard';
// import { respondToTransactionRequest } from '../../redux/slices/transaction-requests';
import Body from '../../shared/typography/Body';
import BodyLarge from '../../shared/typography/BodyLarge';
import IncorrectSigner from '../dapp-tx-approval/errors/IncorrectSigner';
import signMessage from '../dapp-tx-approval/lib/signMessage';
import SimpleBase from '../dapp-tx-approval/types/SimpleBase';
import Loading from '_components/loading';
import UserApproveContainer from '_components/user-approve-container';
import { useAppSelector, useInitializedGuard } from '_hooks';
import { signPersonalMessageRequestsSelectors } from '_redux/slices/sign-personal-message-requests';
import { useDependencies } from '_src/shared/utils/dependenciesContext';

import type { RootState } from '_redux/RootReducer';

export function DappSignMessageApprovalPage() {
    const { connectToLedger } = useSuiLedgerClient();
    const [siteFaviconSrc, setSiteFaviconSrc] = useState<string | undefined>();
    const { signMessageRequestID } = useParams();
    const guardLoading = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);
    const {
        activeAccountIndex,
        accountInfos,
        address: activeAddress,
        authentication,
        passphrase,
    } = useAppSelector(({ account }) => account);
    const signMessageRequestLoading = useAppSelector(
        ({ transactionRequests }) => !transactionRequests.initialized
    );
    const signPersonalMessageRequestSelector = useMemo(
        () => (state: RootState) =>
            (signMessageRequestID &&
                signPersonalMessageRequestsSelectors.selectById(
                    state,
                    signMessageRequestID
                )) ||
            null,
        [signMessageRequestID]
    );
    const signPersonalMessageRequest = useAppSelector(signPersonalMessageRequestSelector);
    const loading = guardLoading || signMessageRequestLoading;
    // const dispatch = useAppDispatch();

    const { closeWindow } = useDependencies();

    const { message } = useMemo(() => {
        if (signPersonalMessageRequest?.tx?.type !== 'sign-personal-message') return {};

        const bytes = fromB64(signPersonalMessageRequest.tx.message);
        let message: string = signPersonalMessageRequest.tx.message;
        let type: 'utf8' | 'base64' = 'base64';
        try {
            message = new TextDecoder('utf8', { fatal: true }).decode(bytes);
            type = 'utf8';
        } catch (e) {
            // do nothing
        }
        return {
            message,
            type,
        };
    }, [signPersonalMessageRequest]);

    const handleOnSubmit = useCallback(
        async (approved: boolean) => {
            if (!message) return;

            if (signPersonalMessageRequest?.tx?.type === 'sign-personal-message') {
                await signMessage(
                    connectToLedger,
                    signPersonalMessageRequest.tx.message,
                    signPersonalMessageRequest.id,
                    approved,
                    passphrase,
                    authentication,
                    activeAddress,
                    accountInfos,
                    activeAccountIndex
                );

                closeWindow();
            }
        },
        [
            accountInfos,
            activeAccountIndex,
            activeAddress,
            authentication,
            closeWindow,
            connectToLedger,
            message,
            passphrase,
            signPersonalMessageRequest,
        ]
    );

    const handleImgError = useCallback(() => {
        setSiteFaviconSrc(undefined);
    }, []);

    useEffect(() => {
        if (signPersonalMessageRequest) {
            setSiteFaviconSrc(signPersonalMessageRequest.originFavIcon);
        }
    }, [signPersonalMessageRequest]);

    if (
        activeAddress &&
        signPersonalMessageRequest?.tx?.type === 'sign-personal-message' &&
        signPersonalMessageRequest?.tx?.accountAddress &&
        signPersonalMessageRequest?.tx?.accountAddress !== activeAddress
    ) {
        return (
            <SimpleBase
                approval={signPersonalMessageRequest}
                onComplete={handleOnSubmit}
            >
                <div className="py-12">
                    <IncorrectSigner
                        txID={signPersonalMessageRequest.id}
                        txRequest={signPersonalMessageRequest}
                        correctAddress={signPersonalMessageRequest.tx.accountAddress}
                    />
                </div>
            </SimpleBase>
        );
    }

    return (
        <Loading loading={loading} big={true} resize={true}>
            {signPersonalMessageRequest && (
                <UserApproveContainer
                    title="Sign Message"
                    approveTitle="Sign"
                    rejectTitle="Reject"
                    origin={signPersonalMessageRequest.origin}
                    originFavIcon={signPersonalMessageRequest.originFavIcon}
                    onSubmit={handleOnSubmit}
                >
                    <div className="flex flex-col justify-center items-center gap-6 dark:text-slate-300 pb-6">
                        <div className="px-6 flex gap-3 justify-center items-center">
                            {!siteFaviconSrc ? (
                                <div className="rounded-full p-2 h-12 w-12 border-[0.5px] border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary">
                                    <GlobeAltIcon className="h-full w-full text-ethos-light-text-default dark:text-ethos-dark-text-default" />
                                </div>
                            ) : (
                                <img
                                    src={siteFaviconSrc}
                                    className="h-12"
                                    alt="Site Favicon"
                                    onError={handleImgError}
                                />
                            )}
                            <div>
                                <div className="text-base">
                                    {formatUrl(signPersonalMessageRequest.origin)}
                                </div>
                                <div>has requested you sign a message</div>
                            </div>
                        </div>
                        {message && (
                            <div className="flex flex-col gap-1 px-6 w-full">
                                <BodyLarge>Message To Sign</BodyLarge>
                                <div className="rounded-lg p-3 bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary">
                                    <Body>{message}</Body>
                                </div>
                            </div>
                        )}
                    </div>
                </UserApproveContainer>
            )}
        </Loading>
    );
}
