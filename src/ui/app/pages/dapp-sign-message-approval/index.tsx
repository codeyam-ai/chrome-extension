import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { fromB64 } from '@mysten/bcs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import formatUrl from '../../helpers/format-url';
import { AppState } from '../../hooks/useInitializedGuard';
import { respondToTransactionRequest } from '../../redux/slices/transaction-requests';
import Body from '../../shared/typography/Body';
import BodyLarge from '../../shared/typography/BodyLarge';
import Loading from '_components/loading';
import UserApproveContainer from '_components/user-approve-container';
import { useAppDispatch, useAppSelector, useInitializedGuard } from '_hooks';
import { signMessageRequestsSelectors } from '_redux/slices/sign-message-requests';

import type { RootState } from '_redux/RootReducer';

export function DappSignMessageApprovalPage() {
    const [siteFaviconSrc, setSiteFaviconSrc] = useState<string | undefined>();
    const { signMessageRequestID } = useParams();
    const guardLoading = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);
    const signMessageRequestLoading = useAppSelector(
        ({ transactionRequests }) => !transactionRequests.initialized
    );
    const signMessageRequestSelector = useMemo(
        () => (state: RootState) =>
            (signMessageRequestID &&
                signMessageRequestsSelectors.selectById(
                    state,
                    signMessageRequestID
                )) ||
            null,
        [signMessageRequestID]
    );
    const signMessageRequest = useAppSelector(signMessageRequestSelector);
    const loading = guardLoading || signMessageRequestLoading;
    const dispatch = useAppDispatch();

    const message = useMemo(() => {
        if (signMessageRequest?.tx?.type !== 'sign-message') return null;
        return new TextDecoder().decode(fromB64(signMessageRequest.tx.message));
    }, [signMessageRequest]);

    const handleOnSubmit = useCallback(
        async (approved: boolean) => {
            if (signMessageRequest?.tx?.type === 'sign-message') {
                await dispatch(
                    respondToTransactionRequest({
                        txRequestID: signMessageRequest.id,
                        approved,
                        addressForTransaction:
                            signMessageRequest.tx.accountAddress,
                    })
                );
                window.close();
            }
        },
        [dispatch, signMessageRequest]
    );

    const handleImgError = useCallback(() => {
        setSiteFaviconSrc(undefined);
    }, []);

    useEffect(() => {
        if (signMessageRequest) {
            setSiteFaviconSrc(signMessageRequest.originFavIcon);
        }
    }, [signMessageRequest]);

    useEffect(() => {
        if (
            !loading &&
            (!signMessageRequest ||
                (signMessageRequest && signMessageRequest.approved !== null))
        ) {
            window.close();
        }
    }, [loading, signMessageRequest]);

    return (
        <Loading loading={loading} big={true} resize={true}>
            {signMessageRequest && (
                <UserApproveContainer
                    title="Sign Message"
                    approveTitle="Sign"
                    rejectTitle="Reject"
                    origin={signMessageRequest.origin}
                    originFavIcon={signMessageRequest.originFavIcon}
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
                                    {formatUrl(signMessageRequest.origin)}
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
