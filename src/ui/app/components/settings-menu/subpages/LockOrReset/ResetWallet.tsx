import { useCallback, useState } from 'react';

import ResetWalletForm from './ResetWalletForm';
import { useAppDispatch } from '_src/ui/app/hooks';
import { reset as resetWallet } from '_src/ui/app/redux/slices/account';
import ConfirmDestructiveActionDialog from '_src/ui/app/shared/dialog/ConfirmDestructiveActionDialog';
import Body from '_src/ui/app/shared/typography/Body';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';

const ResetWallet = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const reset = useCallback(async () => {
        await dispatch(resetWallet());
        setIsModalOpen(false);
    }, [dispatch]);

    return (
        <div className="flex">
            <div className="flex flex-col gap-6">
                <ContentBlock>
                    <Header>Reset Ethos</Header>
                    <Body isTextColorMedium>
                        Resetting Ethos will delete all of your wallets and
                        information. This can not be be undone. Please proceed
                        with caution.
                    </Body>
                </ContentBlock>
                <ResetWalletForm onSubmit={openModal} />
            </div>
            <ConfirmDestructiveActionDialog
                onCancel={closeModal}
                onConfirm={reset}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title="Are you sure you want to reset your wallet?"
                description="This action cannot be undone."
                primaryButtonText="Reset"
                secondaryButtonText="Cancel"
            />
        </div>
    );
};

export default ResetWallet;
