import { type ReactNode } from 'react';

import HeaderWithLargeEthosIcon from '../headers/page-headers/HeaderWithLargeEthosIcon';
import SignInFlowNavBar from '../navigation/nav-bar/SignInFlowNavBar';
import BaseLayout from './BaseLayout';

type GetStartedCardProps = {
    showBack?: boolean;
    children: ReactNode;
};

const GetStartedCard = ({ showBack, children }: GetStartedCardProps) => {
    return (
        <>
            <BaseLayout>
                <SignInFlowNavBar showBackButton={showBack || false} />
                <HeaderWithLargeEthosIcon
                    title="Ethos"
                    description="The new web awaits"
                />
                {children}
            </BaseLayout>
        </>
    );
};

export default GetStartedCard;
