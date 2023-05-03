import { type ReactNode } from 'react';

import BaseLayout from './BaseLayout';
import HeaderWithLargeEthosIcon from '../headers/page-headers/HeaderWithLargeEthosIcon';
import SignInFlowNavBar from '../navigation/nav-bar/SignInFlowNavBar';

type GetStartedCardProps = {
    showBack?: boolean;
    children: ReactNode;
};

const GetStartedCard = ({ showBack, children }: GetStartedCardProps) => {
    return (
        <>
            <BaseLayout>
                <SignInFlowNavBar showBackButton={showBack || false} />
                <HeaderWithLargeEthosIcon description="The new web awaits" />
                {children}
            </BaseLayout>
        </>
    );
};

export default GetStartedCard;
