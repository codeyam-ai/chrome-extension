import { type ReactNode } from 'react';

import logo from '../../components/logo/ethos-logo.png';
import LargePageHeaderWIthIcon from '../headers/page-headers/LargePageHeaderWithIcon';
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
                <LargePageHeaderWIthIcon
                    iconSrc={logo}
                    iconAlt="Ethos Wallet logo"
                    header="Ethos"
                    description="The new web awaits"
                />
                {children}
            </BaseLayout>
        </>
    );
};

export default GetStartedCard;
