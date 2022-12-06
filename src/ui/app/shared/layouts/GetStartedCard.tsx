import { type ReactNode } from 'react';

import HeaderWithIconRow from '../headers/page-headers/HeaderWithIconRow';
import SignInFlowNavBar from '../navigation/nav-bar/SignInFlowNavBar';
import BaseLayout from './BaseLayout';

type GetStartedCardProps = {
    showBack?: boolean;
    children: ReactNode;
};

const GetStartedCard = ({ showBack, children }: GetStartedCardProps) => {
    return (
        <>
            <BaseLayout hideNavbar>
                <SignInFlowNavBar showBackButton={showBack || false} />
                <HeaderWithIconRow
                    title="Ethos"
                    description="The new web awaits"
                />
                {children}
            </BaseLayout>
        </>
    );
};

export default GetStartedCard;
