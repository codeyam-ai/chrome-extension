import { useCallback } from 'react';

import ResetWalletForm from './ResetWalletForm';
import { useAppDispatch } from '_src/ui/app/hooks';
import { reset as resetWallet } from '_src/ui/app/redux/slices/account';
import Body from '_src/ui/app/shared/typography/Body';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';

const ResetWallet = () => {
    const dispatch = useAppDispatch();

    const reset = useCallback(async () => {
        if (window.confirm('Are you sure you want to reset your wallet?')) {
            await dispatch(resetWallet());
        }
    }, [dispatch]);

    return (
        <div className="py-6 flex flex-col gap-6">
            <ContentBlock>
                <Header>Reset Ethos</Header>
                <Body isTextColorMedium>
                    Resetting Ethos will delete all of your wallets and
                    information. This can not be be undone. Please proceed with
                    caution.
                </Body>
            </ContentBlock>
            <ResetWalletForm onSubmit={reset} />
        </div>
    );
};

export default ResetWallet;
