import { useCallback } from 'react';

import { useAppDispatch } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import Well from '_src/ui/app/shared/content/Well';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';
import { thunkExtras } from '_store/thunk-extras';

// TODO: test
const LockPage = () => {
    const dispatch = useAppDispatch();

    const lockWallet = useCallback(async () => {
        thunkExtras.background.lockWallet();
    }, [dispatch]);

    return (
        <div className="flex flex-col">
            <ContentBlock className="!py-6">
                <Header>Lock Ethos</Header>
                <BodyLarge isTextColorMedium>
                    Here you can restrict access to your wallet by locking it.
                    You&apos;ll need to enter your password to unlock your
                    wallet.
                </BodyLarge>
            </ContentBlock>
            <Well
                header="Wallet Autolock"
                subHeader="Ethos will autolock after 15 minutes."
            />
            <Button onClick={lockWallet}>Lock Wallet</Button>
        </div>
    );
};

export default LockPage;
