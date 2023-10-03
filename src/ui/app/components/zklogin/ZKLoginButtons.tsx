import { EnvelopeIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ZKLoginButton from './ZKLoginButton';
import LoadingIndicator from '../loading/LoadingIndicator';
import googleLogo from '_images/social-login-icons/google.png';
import twitchLogo from '_images/social-login-icons/twitch.png';
import Body from '_src/ui/app/shared/typography/Body';

export function ZKLoginButtons() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onClickEmail = useCallback(() => {
        navigate('/initialize/hosted');
    }, [navigate]);

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
                    <span className="sr-only">Sign in with Email</span>
                    <EnvelopeIcon className="w-6 h-6" />
                </button>
                <ZKLoginButton
                    provider="google"
                    logo={googleLogo}
                    setLoading={setLoading}
                />
                <ZKLoginButton
                    provider="twitch"
                    logo={twitchLogo}
                    setLoading={setLoading}
                />
            </div>
        </>
    );
}
