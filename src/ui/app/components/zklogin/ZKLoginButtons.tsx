import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';

import { zkloginWithGoogle, type ZKData, stub } from './ZKLogin';
import googleLogo from '_images/social-login-icons/google.png';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Body from '_src/ui/app/shared/typography/Body';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../loading/LoadingIndicator';

export function ZKLoginButtons() {
    const client = api.instance.client;
    const navigate = useNavigate();
    const [isLoadingService, setIsLoadingService] = useState<'Google'>();

    const onClickEmail = useCallback(() => {
        navigate('/initialize/hosted');
    }, [navigate]);

    const onClickGoogle = useCallback(async () => {
        setIsLoadingService('Google');
        // const payload: ZKData = await zkloginWithGoogle(client);
        setTimeout(() => {
            const result = stub;
            setIsLoadingService(undefined);
        }, 3000);
        return;
    }, []);

    return (
        <>
            <div className="flex items-center">
                <div className="w-full border-t border-ethos-light-text-stroke" />
                <Body isSemibold isTextColorMedium className="italic px-4">
                    or
                </Body>
                <div className="w-full border-t border-ethos-light-text-stroke" />
            </div>
            <Body isSemibold>Sign in or create a wallet with:</Body>
            <div className="flex gap-3">
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
                    {isLoadingService === 'Google' ? (
                        <LoadingIndicator />
                    ) : (
                        <img
                            src={googleLogo}
                            alt="Google logo"
                            className="w-7 h-7"
                        />
                    )}
                </button>
            </div>
        </>
    );
}
