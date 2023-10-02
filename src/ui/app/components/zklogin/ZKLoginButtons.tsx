import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Zk } from './ZKLogin';
import getNextEmoji from '../../helpers/getNextEmoji';
import getNextWalletColor from '../../helpers/getNextWalletColor';
import { useAppDispatch } from '../../hooks';
import { saveAccountInfos, setZk } from '../../redux/slices/account';
import LoadingIndicator from '../loading/LoadingIndicator';
import googleLogo from '_images/social-login-icons/google.png';
import Permissions from '_src/background/Permissions';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Body from '_src/ui/app/shared/typography/Body';

import type { ZkData } from './ZKLogin';
import type { AccountInfo } from '../../KeypairVault';

export function ZKLoginButtons() {
    const client = api.instance.client;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const onClickEmail = useCallback(() => {
        navigate('/initialize/hosted');
    }, [navigate]);

    const onClickGoogle = useCallback(async () => {
        setLoading(true);
        let zkData: ZkData | null;
        try {
            zkData = await Zk.login(client);
            if (!zkData) {
                setLoading(false);
                return;
            }
        } catch (error) {
            setLoading(false);
            return;
        }

        setLoading(false);

        await dispatch(
            saveAccountInfos([
                {
                    address: zkData.address,
                    index: 0,
                    publicKey: zkData.address,
                    color: getNextWalletColor(0),
                    emoji: getNextEmoji(0),
                    nftPfpUrl: zkData.profileInfo?.picture,
                    nickname: zkData.profileInfo?.given_name
                        ? `${zkData.profileInfo?.given_name}'s Wallet`
                        : 'Primary Wallet',
                } as AccountInfo,
            ])
        );

        await Permissions.grantEthosDashboardBasicPermissionsForAccount(
            zkData.address
        );

        await dispatch(setZk(zkData));

        // navigate('/initialize/complete');

        // const zkSigner = new ZkSigner({ zkData, client });
        // setTimeout(async () => {
        //     console.log('zkSigner :>> ', zkSigner);
        //     console.log('BEGINNING SIGNING');
        //     const testString = 'This is a test string';
        //     const testUint8Array = new TextEncoder().encode(testString);

        //     const signRes = await zkSigner.signMessage({
        //         message: testUint8Array,
        //     });
        //     console.log('signRes :>> ', signRes);
        // }, 1000);
        return;
    }, [client, dispatch]);

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <LoadingIndicator big white />
                </div>
            )}

            <div className="flex items-center">
                <div className="w-full border-t border-ethos-light-text-stroke" />
                <Body isSemibold isTextColorMedium className="italic px-4">
                    or
                </Body>
                <div className="w-full border-t border-ethos-light-text-stroke" />
            </div>
            <Body isSemibold>Sign in or create a wallet with:</Body>
            <div className="flex gap-3 mx-auto">
                <button
                    onClick={onClickEmail}
                    className="flex items-center place-content-center w-[68px] h-[52px] rounded-[10px] bg-ethos-light-background-secondary"
                >
                    <span className="sr-only">Sign in with email</span>
                    <EnvelopeIcon className="w-6 h-6" />
                </button>
                <button
                    onClick={onClickGoogle}
                    className="flex items-center place-content-center w-[68px] h-[52px] rounded-[10px] bg-ethos-light-background-secondary"
                >
                    <span className="sr-only">Sign in with Google</span>
                    <img
                        src={googleLogo}
                        alt="Google logo"
                        className="w-7 h-7"
                    />
                </button>
            </div>
        </>
    );
}
